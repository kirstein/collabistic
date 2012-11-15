define([ 'marionette', 'collabistic' ], function(Marionette, collabistic) {
    var app    = collabistic.app;

    return Marionette.AppRouter.extend({
        routes : {
            'login/' : 'renderLogin',
            'login'  : 'renderLogin'
        },

        initialize : function() {
            this.on('all', function() {
                console.debug('AuthModule > LoginRouter > event:', arguments);
            });
        },
        renderLogin : function() {
            app.AuthModule.trigger('render:login');
        }
    });
});