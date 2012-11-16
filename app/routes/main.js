var path    = require('path'),
    config  = require(path.join(process.cwd(), 'config'));

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {
      title : config.app.title
    });
  });
};