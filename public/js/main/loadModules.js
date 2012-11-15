// Boilerplate for module loader
define([].concat(window.config.modules), function() {
  console.debug('Modules loaded:', arguments.length);
  return Array.prototype.slice.call(arguments);
});