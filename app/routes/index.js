var fs     = require('fs'),
    log4js = require('log4js'),
    log    = log4js.getLogger(__filename);

module.exports = function() {
    log.info('Adding main routes');
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js') {
            return;
        }

        var name = file.substr(0, file.indexOf('.'));
        require('./' + name).link();
    });
};