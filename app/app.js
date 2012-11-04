var config = require('../config'),
    path = require('path');

var express = require('express'),
    app     = express();

app.configure(function() {
  app.set('port', config.port);
  app.set('views', config.viewsURI);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({
    src: config.public.URI,
    compress: true
  }));
  app.use(express.static(config.public.URI));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

module.exports = app;