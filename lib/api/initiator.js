var path   = require('path'),
    fs     = require('fs'),
    config = require(path.join(process.cwd(), 'config')),
    Initiator;

global.collabistic.initiators = global.collabistic.initiators || [];
Initiator = function(module) {

    if(typeof module === 'undefined') {
        throw new Error("Module not defined");
    }
    try {
        this.module     = module;
        this.name       = module.name;
        this.initPaths  = module.manifest.initiators;

         if (typeof this.name === "undefined") {
            throw new Error("Module name is undefined");
        }
    } catch(e) {
        throw new Error("Invalid module definition: " + e);
    }
};

Initiator.prototype.add = function(initiators) {
    initiators = initiators || this.initPaths;

    if (typeof initiators === "undefined") {
        throw new Error('No initiators defined!');
    }

    if (!this._validateInitiator(initiators)) {
        throw new Error('Initiator not in assets dir. Has it been linked yet?');
    }

    var results = [],
        i;

    if (initiators instanceof Array) {
        for (i = initiators.length - 1; i >= 0; i--) {
            results = results.concat(this.add(initiators[i]));
        }

        return results;
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
    if (initiator instanceof Array) {
        return true;
    }
    var assetPath = this._getAssetPath(initiator);
    return fs.existsSync(path.join(config.public.URI, assetPath));
};

module.exports = function(module) {
    return new Initiator(module);
};
