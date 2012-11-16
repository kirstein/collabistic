var path      = require('path'),
    config    = {};

// Application settings
config.app = {
  title : 'Collabistic ALPHA-ALPHA!',
  dir   : path.join(process.cwd(), 'app'),
  port  : process.env.PORT || 3000,
  views : path.join(process.cwd(), 'app', 'views'),
  lib   : path.join(process.cwd(), 'lib')
};

// General router settings
config.router = path.join(config.app.dir, 'routes');

// Filter configs
config.filter = {
  // pushstate modules settings
  pushState : {
    freepaths : [ '/','/js', '/modules', '/css', '/img' ]
  }
};

// Public settings
config.pub = {
  dir     : path.join(process.cwd(), 'public'),
  config  : path.join(process.cwd(), 'public/js/config.json')
};

// Module settings
config.module = {
  initiator  : 'modules',
  dir        : path.join(process.cwd(), 'modules'),
  // dir name that will be linked to public folder: public/<link>
  link       : 'modules',
  // list of files that a module must have
  files      : [ 'index.js', 'manifest.json' ],
  manifest   : {
    filename   : 'manifest.json'
  },
  // Properties that define a module object
  properties : [ 'name', 'location', 'manifest' ]
};


// Export modules
module.exports = config;