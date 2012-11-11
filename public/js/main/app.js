requirejs.config({
    baseUrl: './js/',
    paths: {

        // Folder definitions
        modules : '../modules',
        lib     : 'lib',

        // Libraries
        backbone   : 'lib/backbone-min',
        underscore : 'lib/lodash-min',
        marionette : 'lib/backbone-marionette-min',

        // Plugins
        domReady   : 'lib/plugin/domReady',

        // jQuery plugins
        'jquery.cookie' : 'lib/plugin/jquery-cookie'
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
        'jquery.cookie' : {
            deps : ['jquery'],
            exports : '$'
        }
    }
});

define(['domReady','collabistic', 'main/mixins', 'main/modules'], function(domReady, collabistic) {
    domReady(function(){

        var app    = collabistic.app;

        // Start the app
        app.start();
        console.debug('Starting application');
    });
});