// Boilerplate for module loader
define(['collabistic'].concat(window._initiators), function(collabistic) {


    var modules = Array.prototype.slice.call(arguments);

    // Remove fist item
    modules.shift();

    console.info("Modules loaded:", modules.length);

    // Return an array of loaded modules
    return modules;
});