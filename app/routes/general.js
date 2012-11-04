var path   = require('path'),
    config = require(path.join(process.cwd(), 'config'));

exports.link = function() {
    var collab      = global.collabistic,
        that        = this;

    this.app        = collab.app;
    this.initiators = collab.initiators;


    this.app.get('/', function(req, res) {
        res.render('index', {
            _initiators : that.initiators,
            title       : config.title
        });
    });
};