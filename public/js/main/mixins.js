var mixins = (function() {
    var res    = [],
        mixins = window.config.mixins,
        i, mixin, config;

    for (i = 0; i < mixins.length; i++) {
        mixin = mixins[i];

        // Check if module definition is an object
        // If its an object check if its has a path
        if (typeof mixin === 'object' && typeof mixin.path !== 'undefined') {
            config        = {};
            config[mixin.path] = mixin.config;

            // If module has config attach it.
            if (typeof mixin.config !== 'undefined') {
                requirejs.config({ config : config });
            }
            res.push(mixin.path);
        } else {
            res.push(mixin);
        }
    }

    return res;
})();

// Boilerplate for loading all the mixins.
require([].concat(mixins), function() {
    var mixins = Array.prototype.slice.call(arguments);

    console.info("Mixins loaded:", mixins.length);

    // Return the list of loaded mixins
    return mixins;
}, function (err) {
    var failedId = err.requireModules && err.requireModules[0];
    alert(err.requireModules);
    console.error('Mixin loading failed:', failedId);
});