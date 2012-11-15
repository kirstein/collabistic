var fs     = require('fs'),
    path   = require('path'),
    mkdirp = require('mkdirp'),
    config = require(path.join(process.cwd(), 'config')),
    mainAssetDir = path.join(config.pub.dir, config.module.link),
    Assets;

Assets = function(module) {
    this.module = module;
    this.assets = module.manifest.assets || {};
};

Assets.prototype.link = function(uri) {
    var assetDir;

    uri = uri || this.assets.dir;
    if(typeof uri === "undefined") {
        throw new Error("No assets URI defined.");
    }

    assetDir = path.join(this.module.location, uri);
    if (!fs.existsSync(assetDir)) {
        throw new Error("Asset location does not exist");
    }

    this._removeLinks();
    this._checkPublicDir();
    this._writeLinks(assetDir);
};

Assets.prototype._removeLinks = function() {
    if (fs.existsSync(path.join(mainAssetDir, this.module.name))) {
        fs.unlinkSync(path.join(mainAssetDir, this.module.name));
    }
};
Assets.prototype._writeLinks = function(assetDir) {
    fs.symlinkSync(assetDir, path.join(mainAssetDir, this.module.name));
};

Assets.prototype._checkPublicDir = function() {
    if (!fs.existsSync(mainAssetDir)) {
        mkdirp.sync(mainAssetDir);
    }
};

Assets.prototype.unlink = function() {
    this._removeLinks();
};

module.exports = function(module) {
    return new Assets(module);
};