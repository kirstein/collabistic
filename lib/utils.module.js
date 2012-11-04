var path       = require('path'),
    fs         = require('fs'),
    utils      = require('./utils'),
    config     = require(path.join(process.cwd(), 'config'));


exports.getModulesSync = function(dir, files) {
    var result = [];

    if (typeof dir === 'undefined' || !fs.existsSync(dir)) {
        throw new Error("module directory not defined or does not exist");
    }

    fs.readdirSync(dir).forEach(function(file) {
        var fullPath = path.join(dir, file);

        // If given file is a directory
        if (fs.statSync(fullPath).isDirectory()) {
            // Check if the directory contains needed files to qualify as a module
            if(typeof files === 'undefined' || utils.filesExistsSync(fullPath, files)) {
                result.push(fullPath);
            }
        }
    });

    return result;
};


function _getModuleObject (moduleLocation) {
    return {
        name     : path.basename(moduleLocation),
        location : moduleLocation,
        manifest : require(path.join(moduleLocation, config.module.manifest))
    };
}

exports.loadModules = function(moduleList) {
    if (typeof moduleList === 'undefined') {
        throw new Error("module listing must be defined");
    }

    var modules = [],
        module,
        moduleObject,
        moduleLocation,
        api,
        i;
    for (i = moduleList.length - 1; i >= 0; i--) {
        try {
            moduleLocation = moduleList[i];
            moduleObject   = _getModuleObject(moduleLocation);
            api            = require('./api')(moduleObject);
            module         = require(moduleLocation)(api);

            modules.push(moduleObject);
        } catch (e) {
            throw new Error("Module loading failed! " + e);
        }
    }

    return modules;
};

exports.isValid = function(module) {
    if (typeof module !== 'object') {
        return false;
    }

    var neededProperties  = config.module.ownProperties,
        i, property;

    for (i = neededProperties.length - 1; i >= 0; i--) {
        property = neededProperties[i];

        if (typeof module[property] === 'undefined') {
            return false;
        }
    }

    return true;
};