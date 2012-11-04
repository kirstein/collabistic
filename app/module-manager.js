var path   = require('path'),
    config = require(path.join(process.cwd(), 'config')),
    utils  = require(path.join(process.cwd(), 'lib/utils.module'));

exports.loadModules = function() {
    var modules   = utils.getModulesSync(config.modulesURI, config.module.files);

    // Global
    loadedModules = utils.loadModules(modules);
};