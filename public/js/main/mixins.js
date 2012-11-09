// Boilerplate for loading all the mixins.
define(['collabistic'].concat(window.config.mixins), function(collabistic) {

    var mixins = Array.prototype.slice.call(arguments),
        logger = collabistic.logger;

    // Remove first item
    mixins.shift();
    if (window.config.log) {
        logger.info("Mixins loaded:", mixins.length);
    }

    // Return the list of loaded mixins
    return mixins;
});