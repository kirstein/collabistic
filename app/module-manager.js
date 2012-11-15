var path   = require('path'),
    config = require(path.join(process.cwd(), 'config')),
    utils  = require(path.join(process.cwd(), 'lib/utils.module'));

exports.loadModules = function() {
    var modules       = utils.getModulesSync(config.module.dir, config.module.files),
        loadedModules = utils.loadModules(modules);

    utils.writeInitiatorsSync(config.pub.config, config.module.initiator, global.collabistic.initiators);

    return loadedModules;
};