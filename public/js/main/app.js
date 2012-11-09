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

require(['collabistic', 'main/mixins', 'main/modules'], function(collabistic) {
    var app    = collabistic.app,
        logger = collabistic.logger;

    // Start the app
    app.start();
    logger.debug('Starting application');
});