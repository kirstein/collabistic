// Boilerplate for module loader
define(window._initiators, function() {


    var modules = Array.prototype.slice.call(arguments);

    if (window.config.log) {
        console.log("Modules loaded:", modules.length);
    }
    // Return an array of loaded modules
    return modules;
});