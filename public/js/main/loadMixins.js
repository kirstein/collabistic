var buildMixins = function() {
    var res = [],
        mixins = window.config.mixins,
        i, mixin, config;

    for(i = 0; i < mixins.length; i += 1) {
        mixin = mixins[i];

        // Check if module definition is an object
        // If its an object check if its has a path
        if(typeof mixin === 'object' && typeof mixin.path !== 'undefined') {
            config = {};
            config[mixin.path] = mixin.config;

            // If module has config attach it.
            if(typeof mixin.config !== 'undefined') {
                requirejs.config({
                    config: config
                });
            }
            res.push(mixin.path);
        } else {
            res.push(mixin);
        }
    }
    return res;
};

define(buildMixins(), function() {
    console.debug('Loaded mixins:', arguments.length);
    // Return the list of mixins
    return Array.prototype.slice.call(arguments);
});