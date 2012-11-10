define(['collabistic', './router/router'], function(collabistic, Router) {

    var app         = collabistic.app,
        config      = window.config;

    return app.module('LoginModule', function(LoginModule, MyApp, Backbone, Marionette) {

        // Initialize router
        app.addInitializer(function() {
            LoginModule.router = new Router();
        });

        app.on('start', function() {
            if (config.log) {
                console.info('LoginModule loaded');
            }
        });

        // Events

        LoginModule.on('all', function() {
            console.debug('LoginModule > event:', arguments);
        });
        LoginModule.on('render:login', function() {
            console.warn('should render login page');
            console.error('error');
        });
    });
});