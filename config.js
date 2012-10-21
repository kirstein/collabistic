var path = require('path');

// Basic site settings
exports.site = "localhost";
exports.port = process.env.PORT || 3000;
exports.baseURL = "http://#{exports.site}:#{exports.port}";

// Base configuration
exports.appURI = path.join(process.cwd(), "app");
exports.routerURI = path.join(exports.appURI, "routes/router");
exports.viewsURI  = path.join(exports.appURI, "views");
exports.publicURI = path.join(process.cwd(), "public");

// Module management
exports.modulesURI = path.join(exports.appURI, "modules");