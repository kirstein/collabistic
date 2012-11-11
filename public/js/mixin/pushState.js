define([ 'module','collabistic', 'backbone', 'jquery.cookie'], function(module, collabistic, Backbone, $) {
    var app         = collabistic.app,
        cookieName  = module.config().cookieName;

    app.on('start', function() {
        var cookie = $.cookie(cookieName);
        if (cookie !== null) {
            $.removeCookie(cookieName);
            Backbone.history.navigate(cookie, { trigger: true });
            console.debug('Found redirect cookie. Routing to:', cookie);
        }
    });
});