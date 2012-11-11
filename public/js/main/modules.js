// Boilerplate for module loader
define(['text!' + window.config.initiators ], function(obj) {

  function loadModule (module) {
    loadingSuccess = function() {
            console.info("Module:", module, "loaded!");
        };

    loadingFail = function(err) {
        var failedId = err.requireModules && err.requireModules[0];
        console.error('Module loading failed:', failedId);
    };

    require([module], loadingSuccess, loadingFail);
  }

  var list = JSON.parse(obj).initiators,
      i;

  for (i = 0; i < list.length; i++) {
    loadModule(list[i]);
  }

  return list;
});