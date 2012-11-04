var InjectRoutes = function(module) {
    this.module = module;
    this.app    = global.collabistic.app;

    if (typeof this.module === 'undefined') {
        throw new Error("Module not defined");
    }
};


InjectRoutes.prototype._setRoute = function(type, path, callback) {
    var that    = this,
        routes  = this.app.routes,
        oldType = routes[type],
        oldPath, i;

    if (typeof oldType !== "undefined") {
        for (i = oldType.length - 1; i >= 0; i--) {
            oldPath = oldType[i].path;
            if(oldPath === path) {
                throw new Error("Path already exists. Can't override old paths.");
            }
        }
    }

    this.app[type](path, function() {
        var args = Array.prototype.slice.call(arguments);
        callback.apply(this, [that.module].concat(args));
    });
};

InjectRoutes.prototype.inject = function(routes) {
    if (typeof routes === 'undefined') {
        throw new Error('No routes defined');
    }

    var injectedRoutes  = [],
        type            = routes.type,
        callback        = routes.callback,
        path            = routes.path;

    if(routes instanceof Array) {
        for (var i = routes.length - 1; i >= 0; i--) {
            injectedRoutes = injectedRoutes.concat(this.inject(routes[i]));
        }
        return injectedRoutes;
    }

    routes = routes || {};

    if(typeof type === "undefined" || typeof callback !== "function" || typeof path === "undefined") {
        throw new Error("No type, callback or path defined");
    }

    this._setRoute(type, path, callback);
    injectedRoutes.push(path);

    return injectedRoutes;
};


module.exports = function(module) {
    return new InjectRoutes(module);
};