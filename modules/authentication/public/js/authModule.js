define(['collabistic',
        './router/router',
        './view/loginView',
        './view/registerView',
        './view/forgotView'
       ], function(collabistic, Router, LoginView, RegisterView, ForgotView) {

    return collabistic.app.module('AuthModule', function(AuthModule, MyApp, Backbone, Marionette) {
        AuthModule.views = {};

        // Add initializers
        MyApp.addInitializer(function() {
            AuthModule.router               = new Router();

            // Views
            AuthModule.views.loginView      = new LoginView();
            AuthModule.views.registerView   = new RegisterView();
            AuthModule.views.forgotView     = new ForgotView();
        });

        MyApp.on('start', function() {
            console.info('AuthModule loaded');
        });

        // Events
        AuthModule.on('all', function() {
            console.log('AuthModule > event:', arguments);
        });

        AuthModule.on('render:login', function() {
            MyApp.trigger('render:content', AuthModule.views.loginView);
        });

        AuthModule.on('render:register', function() {
            MyApp.trigger('render:content', AuthModule.views.registerView);
        });

        AuthModule.on('render:forgot', function() {
            MyApp.trigger('render:content', AuthModule.views.forgotView);
        });
    });
});