window.config = {
    // Logging levels:
    // 5. Error, someting really wrong, used data can be corrupt. Shit hit the fan.
    // 4. Warning, this is not right, I can continue, but please have a look.
    // 3. Hint/Information, i like to say something, but I don't expect you to listen.
    // 2. Debug, all information only interesting for programmers.
    // 1. Log, almost everything...
    // 0. Everything!
    // All levels above are included. (lvl 3 = 3,4)
    log : {
        level      : 1,
        dateFormat : '[%H:%m:%s]'
    },
    mixins      : [ 'mixin/router' ],
    history     : {
        pushState : true,
        trigger   : true
    }
};