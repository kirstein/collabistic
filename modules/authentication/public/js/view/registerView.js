define(['collabistic',
        'marionette',
        'underscore',
        'text!../../tpl/register.html'
       ], function(collabistic, Marionette, _, tpl) {

  var app = collabistic.app;

  return Marionette.ItemView.extend({
    template : _.template(tpl)
  });
});