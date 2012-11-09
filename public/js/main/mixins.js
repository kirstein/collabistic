// Boilerplate for loading all the mixins.
define([].concat(window.config.mixins), function() {

    var mixins = Array.prototype.slice.call(arguments);

    if (window.config.log) {
        console.log("Mixins loaded:", mixins.length);
    }

    // Return the list of loaded mixins
    return mixins;
});