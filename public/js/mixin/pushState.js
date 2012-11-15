define([ 'module','collabistic', 'backbone', 'jquery.cookie'], function(module, collabistic, Backbone, $) {
    console.debug('pushState mixin loaded:',module.config());

    var app         = collabistic.app,
        cookieName  = module.config().cookieName;

    function route() {
        var cookie = $.cookie(cookieName);
        if (cookie !== null) {
            $.removeCookie(cookieName);
            Backbone.history.navigate(cookie, { trigger: true });
            console.debug('Found redirect cookie. Routing to:', cookie);
        }
    }

    if (Backbone.history) {
        route();
    } else {
        app.on('start', route);
    }
});