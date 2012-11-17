var API,
    utils = require('../utils.module');

API = function(module) {
    this.module = module;

    if (typeof this.module === "undefined") {
        throw new Error("Module not defined");
    } else if (!utils.isValid(module)) {
        throw new Error("Invalid module definition");
    }
};

API.prototype.injectResource = function(resource, resources) {
    return require('./injectResource')(this.module).inject(resource, resources);
};
API.prototype.injectRoutes = function(routes) {
    return require('./injectRoute')(this.module).inject(routes);
};

API.prototype.linkAssets = function(uri) {
    return require('./assets')(this.module).link(uri);
};

API.prototype.unlinkAssets = function() {
    return require('./assets')(this.module).unlink();
};

API.prototype.addInitiator = function(initiators) {
    return require('./initiator')(this.module).add(initiators);
};

module.exports = function(module) {
    return new API(module);
};
