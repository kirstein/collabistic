define([ 'marionette', 'collabistic' ], function(Marionette, collabistic) {
    var app    = collabistic.app;

    return Marionette.AppRouter.extend({
        routes : {
            '/'        : 'renderLogin',
            ''         : 'renderLogin',
            'register/'        : 'renderRegister',
            'register'         : 'renderRegister',
            'forgot-password'  : 'renderForgot',
            'forgot-password/' : 'renderForgot'
        },

        initialize : function() {
            this.on('all', function() {
                console.log('AuthModule > LoginRouter > event:', arguments);
            });
        },
        renderRegister : function() {
            app.AuthModule.trigger('render:register');
        },

        renderForgot   : function() {
            app.AuthModule.trigger('render:forgot');
        },

        renderLogin    : function() {
            app.AuthModule.trigger('render:login');
        }
    });
});