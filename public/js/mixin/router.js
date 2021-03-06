define([ 'module', 'collabistic', 'backbone', 'jquery' ], function(module, collabistic, Backbone, $) {
    console.debug('router mixin loaded:',module.config());

    var app    = collabistic.app,
        config = module.config();

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
        // Bind all anchor tags to route
        $(document.body).delegate('a', 'click', route);


        console.info('starting backgone router with properties:', JSON.stringify(config));
        Backbone.history.start(config);

        // Trigger router start event
        app.trigger('router:start');
    }

    if (Backbone.history) {
        // Start if history is already available
        startHistory();
    } else {
        // Start history on 'start' event from application
        app.on('start', startHistory);
    }
});