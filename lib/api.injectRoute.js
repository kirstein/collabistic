var InjectRoutes = function(moduleLocation) {
    this.moduleLocation = moduleLocation;
};


InjectRoutes.prototype._setRoute = function(type, path, callback) {
    var that    = this,
        routes  = app.routes,
        oldType = routes[type],
        oldPath;

    if (typeof oldType !== "undefined") {
        for(var i = 0; i < oldType.length; i += 1) {
            oldPath = oldType[i].path;
            if(oldPath === path) {
                throw new Error("Path already exists. Can't override old paths.");
            }
        }
    }

    app[type](path, function() {
        var args = Array.prototype.slice.call(arguments);
        callback.apply(this, [that.moduleLocation].concat(args));
    });
};

InjectRoutes.prototype.inject = function(routes) {
    if (typeof routes === 'undefined') {
        throw new Error('No routes defined');
    }

    if(routes instanceof Array) {
        for (var i = routes.length - 1; i >= 0; i--) {
            this.inject(routes[i]);
        }
        return;
    }

    routes = routes || {};

    var type     = routes.type,
        callback = routes.callback,
        path     = routes.path;

    if(typeof type === "undefined" || typeof callback !== "function" || typeof path === "undefined") {
        throw new Error("No type, callback or path defined");
    }

    this._setRoute(type, path, callback);
};


module.exports = function(moduleLocation) {

    return new InjectRoutes(moduleLocation);
};