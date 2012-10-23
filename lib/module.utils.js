var path = require('path'),
    fs = require('fs');


exports.getModulesSync = function(dir, options) {
    var result = [];

    if (typeof dir === 'undefined' || !fs.existsSync(dir)) {
        throw new Error("module directory path not defined or does not exist");
    }

    fs.readdirSync(dir).forEach(function(file) {
        var fullPath = path.join(dir, file),
            files;
        // If given file is a directory
        if (fs.statSync(fullPath).isDirectory()) {
            // Check if the directory contains needed files to qualify as a module
            if(typeof options === 'undefined' || exports.filesExistsSync(fullPath, options)) {
                result.push(file);
            }
        }
    });

    return result;
};
