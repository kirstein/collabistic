var fs   = require('fs'),
    root = {},
    API;

API = function(moduleLocation) {
    this.location = root.location = moduleLocation;

    if (typeof this.location === "undefined" || !fs.existsSync(this.location)) {
        throw new Error("No module location defined");
    }
};

API.prototype.injectRoutes = require('./api.injectRoute')(root.location).inject;

module.exports = function(moduleLocation) {
    return new API(moduleLocation);
};
