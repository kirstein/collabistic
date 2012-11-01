var API;

API = function(module) {
    this.module = module;

    if (typeof this.module === "undefined") {
        throw new Error("Module not defined");
    }
};
API.prototype.injectRoutes = function() {
    return require('./injectRoute')(this.module).inject;
};

API.prototype.linkAssets = function() {
    return require('./assets')(this.module).link;
};

API.prototype.unlinkAssets = function() {
    return require('./assets')(this.module).unlink;
};

module.exports = function(module) {
    return new API(module);
};
