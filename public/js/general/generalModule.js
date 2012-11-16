define([ 'collabistic',
         'general/layout/layout'
       ], function(collabistic, Layout) {

  return collabistic.app.module('GeneralModule', function(GeneralModule, MyApp, Backbone, Marionette) {

    MyApp.addInitializer(function() {
      GeneralModule.layout = new Layout();

      MyApp.content.show(GeneralModule.layout);
    });

    MyApp.addRegions({
      content : '#layout-container'
    });

    MyApp.on('start', function() {
        console.debug('Starting application');
    });

    MyApp.on('error', function() {
      console.error.apply(console, Array.prototype.slice.call(arguments));
    });
  });

});