define(['collabistic', './router/router'], function(collabistic, Router) {

    var app         = collabistic.app,
        logger      = collabistic.logger,
        config      = window.config;

    return app.module('LoginModule', function(LoginModule, MyApp, Backbone, Marionette) {

        // Initialize router
        app.addInitializer(function() {
            LoginModule.router = new Router();
        });

        app.on('start', function() {
            if (config.log) {
                logger.info('LoginModule loaded');
            }
        });

        // Events
        LoginModule.on('render:login', function() {
            logger.warn('should render login page');
            logger.error('error');
        });
    });
});