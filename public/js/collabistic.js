define(['marionette', 'underscore', 'main/log'], function(marionette, _, Logger) {

    var collabistic = {};

    // Add logger
    collabistic.logger = new Logger();

    // Make new application
    collabistic.app    = new Marionette.Application();

    return collabistic;

});