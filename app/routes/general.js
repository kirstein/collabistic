var path   = require('path'),
    config = require(path.join(process.cwd(), 'config'));

function uniqueArray (array) {
    return array.filter(function(elem, pos) {
        return array.indexOf(elem) == pos;
    });
}


exports.link = function() {
    var collab      = global.collabistic,
        that        = this;

    this.app        = collab.app;
    this.initiators = collab.initiators;


    this.app.get('/', function(req, res) {
        res.render('index', {
            _initiators : uniqueArray(that.initiators),
            title       : config.title
        });
    });
};