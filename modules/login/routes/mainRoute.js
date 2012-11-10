var MainRoute = function(api) {
    return api.injectRoutes({
        type: 'get',
        path: '/login/test',
        callback : this.login
    });
};

MainRoute.prototype.login = function(module, res, req) {
    console.log(module);
};
module.exports = function(api) {
    return new MainRoute(api);
};

