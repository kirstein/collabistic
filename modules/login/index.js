var log4js = require('log4js'),
    log    = log4js.getLogger(__filename),
    LoginModule;

LoginModule = function(api) {
    log.info('Module loaded');
    this.api = api;
};

LoginModule.prototype.init = function() {
    this.routes     = require('./routes')(this.api);
    this.assets     = this.api.linkAssets();
    this.initiator  = this.api.addInitiator();
};

module.exports = function(api) {
    return new LoginModule(api).init();
};