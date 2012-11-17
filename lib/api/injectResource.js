var InjectResource = function (module) {
  this.module = module;
  this.app    = global.collabistic.app;
};

InjectResource.prototype.inject = function(resource, resources) {
  this.app.resource(resource, resources);
};

module.exports = function (module) {
  return new InjectResource(module);
};