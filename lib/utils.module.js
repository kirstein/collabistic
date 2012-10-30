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


function _getModule (moduleLocation) {
    var api, module;

    api    = require('./api')(moduleLocation);
    module = require(moduleLocation)(api);

    return {
        location : moduleLocation,
        module   : module,
        manifest : require(path.join(moduleLocation, config.module.manifest))
    };
}

exports.loadModules = function(moduleList) {
    if (typeof moduleList === 'undefined') {
        throw new Error("module listing must be defined");
    }

    var modules = [],
        module,
        moduleLocation,
        i;
    for (i = moduleList.length - 1; i >= 0; i--) {
        try {
            moduleLocation = moduleList[i];
            module         = _getModule(moduleLocation);

            modules.push(module);
        } catch (e) {
            throw new Error("Module loading failed! " + e);
        }
    }

    return modules;
};
