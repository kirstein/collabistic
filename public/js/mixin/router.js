define([ 'collabistic' ], function(collabistic) {
    var app = collabistic.app;

    app.on('initialize:after', function() {
        console.log('rock on!');
    });
});