var url = require('url'),
    path = require('path'),
    Filter;

Filter = function(app, freepaths) {
    this.app       = app;
    this.freepaths = freepaths;

    return this.init();
};

Filter.prototype.init = function() {
    var self = this;
    return function(req, res, next) {
        var pathname = url.parse(req.url).pathname;
        if(req.method === 'GET' && self.canRedirect(pathname)) {
            console.log('redirecting route', pathname, 'to /');
            res.cookie('redirect', pathname, {  httpOnly: true });
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        } else {
            next();
        }
    };
};


Filter.prototype.canRedirect = function(pathname) {
    return this._checkDefinedPath(pathname) &&
           this._comparePaths(pathname, this.freepaths);
};

Filter.prototype._checkDefinedPath = function(pathname) {
    var routes = this.app.routes.get || [],
        route;

    for (var i = 0; i < routes.length; i += 1) {
        route = routes[i];
        route = route || {};

        if (!this._comparePaths(pathname, route.path)) {
            return false;
        }
    }
    return true;
};

Filter.prototype._comparePaths = function(pathname, compare) {
    if (!Array.isArray(compare)) {
        compare = [ compare ];
    }

    var paths = pathname.split(path.sep),
        same, tmp;

    for(var i = compare.length - 1; i >= 0; i -= 1) {
        tmp   = compare[i].split(path.sep);
        same  = false;

        // If the path length is lower then it can be the same
        if (tmp.length > paths.length) {
            continue;
        }

        // Loop through all the segments and check if they match
        for(var j = 0; j < tmp.length; j += 1) {
            same = paths[j] === tmp[j];
        }

        // If all the segments were the same
        if(same) {
            return false;
        }
    }
    return true;
};

module.exports = function(app, freepaths) {
    return new Filter(app, freepaths);
};