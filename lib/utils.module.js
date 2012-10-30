var log4js     = require("log4js"),
    log        = log4js.getLogger(__filename),
    path       = require('path'),
    fs         = require('fs'),
    utils      = require('./utils');


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

exports.loadModules = function(moduleList) {
    if (typeof moduleList === 'undefined') {
        throw new Error("module listing must be defined");
    }

    var modules = [],
        module,
        moduleLocation,
        i, api;
    for (i = moduleList.length - 1; i >= 0; i--) {
        try {
            moduleLocation = moduleList[i];
            api            = require('./api')(moduleLocation);
            module         = require(moduleLocation)(api);
            modules.push(module);
        } catch (e) {
            throw new Error("Module loading failed!");
        }
    }

    return modules;
};