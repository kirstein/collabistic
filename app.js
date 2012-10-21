var config = require('./config'),
    path   = require('path');

var server = require(path.join(config.appURI, 'server')),
    http   = require('http');

http.createServer(server).listen(server.get('port'), function(){
  console.log("Express server listening on port " + server.get('port'));
});
