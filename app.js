var config = require('./config'),
    path   = require('path');

// app variables
var app = require(path.join(config.appURI, 'app')),
    http   = require('http');

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express app listening on port " + app.get('port'));
});
