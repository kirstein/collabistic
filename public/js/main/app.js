requirejs.config({
    baseUrl: './js/',
    paths: {

        // Folder definitions
        modules : '../modules',
        lib     : 'lib',
        mixin   : 'mixin',

        // Libraries
        backbone   : 'lib/backbone-min',
        underscore : 'lib/lodash-min',
        marionette : 'lib/backbone-marionette-min',

        // Plugins
        cookie     : 'lib/plugin/jquery-cookie'
    },

    shim : {
        backbone    : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette  : {
            deps : ['backbone'],
            exports: 'Backbone.Marionette'
        },
        cookie      : {
            deps : ['jquery'],
            exports : '$'
        }
    }
});

require(['collabistic', 'main/mixins', 'main/modules'], function(collabistic) {
    var app    = collabistic.app;

    // Start the app
    app.start();
    console.debug('Starting application');
});