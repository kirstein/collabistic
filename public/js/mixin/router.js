define([ 'collabistic', 'backbone', 'jquery' ], function(collabistic, Backbone, $) {
    var app    = collabistic.app,
        config = window.config;


    // Route anchor tags when data-rout is defined
    function route(e) {
        var $el  = $(e.currentTarget),
            href = $el.attr('href'),
            conf = {};

        if ($el.data('route')) {
            e.preventDefault();

            conf.trigger = $el.data('silent') || true;
            conf.replace = $el.data('replace');

            console.info('routing through backbone:', href, JSON.stringify(conf));

            // Route through backbone
            Backbone.history.navigate(href, conf);
        }
    }

    // Start the backbone router
    function startHistory() {
        if (Backbone.history){
            console.info('starting backgone router with properties:', JSON.stringify(config.history));
            Backbone.history.start(config.history);

            // Trigger router start event
            app.trigger('router:start');
        }
    }

     // Bind all anchor tags to route
    $('a').on('click', route);

    // Start history on 'start' event from application
    app.on('start', startHistory);
});