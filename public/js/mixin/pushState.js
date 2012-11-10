define([ 'collabistic', 'backbone', 'cookie'], function(collabistic, Backbone, $) {
    var app         = collabistic.app,
        cookieName  = 'redirect';

    app.on('start', function() {
        var cookie = $.cookie(cookieName);
        if (cookie !== null) {
            $.removeCookie(cookieName);
            Backbone.history.navigate(cookie, { trigger: true });
            console.debug('Found redirect cookie. Routing to:', cookie);
        }
    });
});