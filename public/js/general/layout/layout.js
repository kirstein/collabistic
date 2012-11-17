define(['collabistic',
        'marionette',
        'underscore',
        'text!../tpl/layout.html'
       ], function(collabistic, Marionette, _, tpl) {

  var app = collabistic.app;
      // spinConf = {
      //       lines     : 11, // The number of lines to draw
      //       length    : 0, // The length of each line
      //       width     : 20, // The line thickness
      //       radius    : 35, // The radius of the inner circle
      //       corners   : 1, // Corner roundness (0..1)
      //       rotate    : 0, // The rotation offset
      //       color     : '#000', // #rgb or #rrggbb
      //       speed     : 1, // Rounds per second
      //       trail     : 45, // Afterglow percentage
      //       shadow    : true, // Whether to render a shadow
      //       hwaccel   : false, // Whether to use hardware acceleration
      //       className : 'spinner', // The CSS class to assign to the spinner
      //       zIndex    : 2e9, // The z-index (defaults to 2000000000)
      //       top       : 'auto', // Top position relative to parent in px
      //       left      : 'auto' // Left position relative to parent in px
      //     },
      // spinner  = new Spin(spinConf);

  return Marionette.Layout.extend({
    template: _.template(tpl),
    regions : {
      contentRegion : '#app-content'
    },
    initialize : function() {
      this.bindRegionTrigger();
    },
    bindRegionTrigger : function() {
      var self = this;

      app.on('render:content', function(view) {
        self._renderRegion('contentRegion', view);
      });
    },

    /**
     * Render a view to a given region
     */
    _renderRegion : function(regionName, view) {
      var region = this[regionName];
      if (typeof region === 'undefined') {
        app.trigger('error', 'Rendering region "', regionName,'" failed. Region does not exist');
      } else if (typeof view === 'undefined') {
        app.trigger('error', 'Rendering region "', regionName,'" failed. View does not exist');
      } else {
        console.log('Rendering general region:', regionName);
        region.show(view);
      }
    }
  });
});