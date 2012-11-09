define(['marionette'], function(Marionette) {

    return {
        mixins : [ 'mixin/router', 'mixin/test' ],
        app    : new Marionette.Application()
    };

});