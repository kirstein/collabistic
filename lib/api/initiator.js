var path   = require('path'),
    fs     = require('fs'),
    config = require(path.join(process.cwd(), 'config')),
    Initiator;

global.collabistic.initiators = global.collabistic.initiators || [];
Initiator = function(module) {

    this.module     = module;
    this.name       = module.name;
    this.assets     = module.manifest.assets || {}
    this.initPaths  = this.assets.initiators;
};

Initiator.prototype.add = function(initiators) {
    initiators = initiators || this.initPaths;

    if (typeof initiators === "undefined") {
        throw new Error('No initiators defined!');
    }

    var results = [],
        i;

    if (initiators instanceof Array) {
        for (i = initiators.length - 1; i >= 0; i--) {
            results = results.concat(this.add(initiators[i]));
        }

        return results;
    }

    if (!this._validateInitiator(initiators)) {
        throw new Error('Initiator not in global assets dir. Has it been linked yet?');
    }

    var initiatorPath = this._getAssetPath(initiators);

    results.push(initiatorPath);
    global.collabistic.initiators = global.collabistic.initiators.concat(results);
    return results;
};

Initiator.prototype._getAssetPath = function(initiator) {
    var realPath = path.join(config.public.URI, config.public.linkDir, this.name, initiator);
    return path.relative(config.public.URI, realPath);
};

Initiator.prototype._validateInitiator = function(initiator) {
    var assetPath = this._getAssetPath(initiator);
    return fs.existsSync(path.join(config.public.URI, assetPath));
};

module.exports = function(module) {
    return new Initiator(module);
};
