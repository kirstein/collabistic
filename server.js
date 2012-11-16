var config  = require('./config'),
    path    = require('path'),
    http    = require('http'),
    app     = require(path.join(config.app.dir, 'app'));

var manager = require(path.join(config.app.dir, 'module-manager'));

// Global object
global.collabistic         = { };
global.collabistic.app     = app;
global.collabistic.modules = manager.loadModules();

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express app listening on port " + app.get('port'));
});
