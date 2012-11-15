requirejs.config({
    baseUrl: './js/',
    paths: {
        // Folder definitions
        'modules'       : '../modules',
        'lib'           : 'lib',

        // Libraries
        'backbone'      : 'lib/backbone-min',
        'underscore'    : 'lib/lodash-min',
        'marionette'    : 'lib/backbone-marionette-min',

        // Plugins
        'domReady'      : 'lib/plugin/domReady',
        'text'          : 'lib/plugin/text',
        'step'          : 'lib/plugin/step',

        // App stuff
        'app.config'    : 'main/buildConfig',
        'app.mixins'    : 'main/loadMixins',
        'app.modules'   : 'main/loadModules',

        // jQuery plugins
        'jquery.cookie' : 'lib/plugin/jquery-cookie'
    },

    shim : {
        'backbone'      : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette'    : {
            deps : ['backbone'],
            exports: 'Backbone.Marionette'
        },
        'jquery.cookie' : {
            deps : ['jquery'],
            exports : '$'
        }
    }
});

// Step config. Makes sure that config and mixins are loaded in order.
// Modules are loaded last, after everything else.
require.config({
    config: {
        step: {
            steps: [
                ['app.config'],
                ['app.mixins'],
                ['app.modules']
            ]
        }
    }
});

define(['domReady','collabistic','step!app.modules'], function(domReady, collabistic) {
    domReady(function(){
        var app = collabistic.app;

        // Start the marionette app
        app.on('start', function() {
            console.debug('Starting application');
        });
        app.start();
    });
});