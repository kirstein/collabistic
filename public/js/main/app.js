requirejs.config({
    baseUrl: './js/',
    paths: {

        // Folder definitions
        module : 'modules',
        lib    : 'lib',
        mixin  : 'mixin',

        // Libraries
        backbone   : 'lib/backbone-min',
        underscore : 'lib/lodash-min',
        marionette : 'lib/backbone-marionette-min'
    },

    shim : {
        backbone    : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette  : {
            deps : ['backbone'],
            exports: 'Backbone.Marionette'
        }
    }
});

require(['collabistic', 'main/mixins'], function(collabistic) {
    // Start the app
    collabistic.app.start();
});