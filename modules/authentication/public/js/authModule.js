define(['collabistic', './router/router'], function(collabistic, Router) {

    var app = collabistic.app;

    return app.module('AuthModule', function(AuthModule, MyApp, Backbone, Marionette) {
        // Initialize router
        app.addInitializer(function() {
            AuthModule.router = new Router();
        });

        app.on('start', function() {
            console.info('AuthModule loaded');
        });

        // Events
        AuthModule.on('all', function() {
            console.debug('AuthModule > event:', arguments);
        });

        AuthModule.on('render:login', function() {
            console.warn('should render login page');
            console.error('error');
        });
    });
});