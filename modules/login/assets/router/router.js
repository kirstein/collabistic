define([ 'marionette', 'collabistic' ], function(Marionette, collabistic) {
    var app = collabistic.app;

    return Marionette.AppRouter.extend({
        routes : {
            'login/' : 'renderLogin',
            'login'  : 'renderLogin'
        },

        renderLogin : function() {
            app.LoginModule.trigger('render:login');
        }
    });
});