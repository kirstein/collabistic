var MainRoute = function(api) {
    return api.injectRoutes({
        type: 'get',
        path: '/',
        callback : this.login
    });
};

MainRoute.prototype.login = function(module, req, res) {
    res.render('login', {
            title       : 'test'
        });
};
module.exports = function(api) {
    return new MainRoute(api);
};

