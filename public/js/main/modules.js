// Boilerplate for module loader
define(['collabistic'].concat(window._initiators), function(collabistic) {


    var modules = Array.prototype.slice.call(arguments),
        logger  = collabistic.logger;

    // Remove fist item
    modules.shift();

    logger.info("Modules loaded:", modules.length);

    // Return an array of loaded modules
    return modules;
});