var config = require('../config'),
    path   = require('path');

var express  = require('express'),
    Resource = require('express-resource'),
    app      = express();

// Add pushStateFilter
var PushStateFilter = require(path.join(config.app.lib, '/middleware/pushStateFilter'));
app.use(new PushStateFilter(app, config.filter.pushState.freepaths));

// Add router
require(config.router)(app);

app.configure(function() {
  app.set('port', config.app.port);
  app.set('views', config.app.views);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({
    src: config.pub.dir,
    compress: true
  }));
  app.use(express.static(config.pub.dir));

});

app.configure('development', function() {
  app.use(express.errorHandler());
});

module.exports = app;