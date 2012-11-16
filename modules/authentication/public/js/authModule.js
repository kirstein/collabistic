define(['collabistic',
        './router/router',
        './view/loginView'
       ], function(collabistic, Router, LoginView) {

    return collabistic.app.module('AuthModule', function(AuthModule, MyApp, Backbone, Marionette) {
        AuthModule.views = {};

        // Add initializers
        MyApp.addInitializer(function() {
            AuthModule.router           = new Router();
            AuthModule.views.loginView  = new LoginView();
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

        });

        AuthModule.on('render:forgot', function() {

        });
    });
});