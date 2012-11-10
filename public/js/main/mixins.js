define(function() {
    var getMixins = function() {
        var res = [],
            mixins = window.config.mixins,
            i, mixin, config;

        for(i = 0; i < mixins.length; i++) {
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

    var loadMixin = function(mixin) {
        var loadingSuccess, loadingFail;

        loadingSuccess = function() {
            console.info("Mixin:", mixin, "loaded!");
        };

        loadingFail = function(err) {
            var failedId = err.requireModules && err.requireModules[0];
            console.error('Mixin loading failed:', failedId);
        };

        require([mixin], loadingSuccess, loadingFail);
    };

    var mixins = getMixins(),
        i;

    for(i = 0; i < mixins.length; i++) {
        loadMixin(mixins[i]);
    }

    // Return the list of mixins
    return mixins;
});