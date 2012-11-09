define([ 'marionette', 'collabistic' ], function(Marionette, collabistic) {
    var app    = collabistic.app,
        logger = collabistic.logger;

    return Marionette.AppRouter.extend({
        routes : {
            'login/' : 'renderLogin',
            'login'  : 'renderLogin'
        },

        initialize : function() {
            this.on('all', function(evt) {
                logger.info('Routing:', evt);
            });
        },
        renderLogin : function() {
            app.LoginModule.trigger('render:login');
        }
    });
});