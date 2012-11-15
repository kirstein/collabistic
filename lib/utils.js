var fs   = require('fs');


exports.filesExistsSync = function(dir, file) {
    if (typeof dir === 'undefined' || typeof file === 'undefined' || !fs.existsSync(dir)) {
        throw new Error("target directory or checked not defined, cant be found or empty");
    }

    var files = [];

    // If file parameter is NOT an array, then will add the single file to premade array
    // If the parameter is an array, then will use that array.
    if (!Array.isArray(file)) {
        files.push(file);
    } else {
        files = file;
    }

    // Read through given dir
    // Before each file checks if files array is filled
    // If the array is empty that means that all needed files have been found
    fs.readdirSync(dir).forEach(function (file) {
        var i, tmpFile;

        if (!files.length) {
            return true;
        }
        // Loops through array of files, checks if the array contains a file
        // if it does removes it from the array.
        for (i = files.length - 1; i >= 0; i -= 1) {
            tmpFile = files[i];
            if (tmpFile === file) {
                files.splice(i, 1);
                break;
            }
        }
    });

    return !files.length;
};