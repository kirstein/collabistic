var path = require('path');

// Basic site settings
exports.title   = "Default shit"
exports.site    = "localhost";
exports.port    = process.env.PORT || 3000;
exports.baseURL = "http://#{exports.site}:#{exports.port}";

// Base configuration
exports.appURI    = path.join(process.cwd(), "app");
exports.routerURI = path.join(exports.appURI, "routes");
exports.viewsURI  = path.join(exports.appURI, "views");
exports.public    = {
    URI  : path.join(process.cwd(), "public"),
    linkDir : 'modules'
};

// Module management
exports.modulesURI = path.join(process.cwd(), "modules");
exports.module     = {
    files         : [ 'index.js', 'manifest.json' ],
    manifest      : 'manifest.json',
    ownProperties : [ 'name', 'location', 'manifest' ]
};