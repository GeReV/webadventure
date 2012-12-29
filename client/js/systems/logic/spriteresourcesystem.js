define([
  'core/logicsystem',
  'util/resourcs/resourcemanager'
  ], function(LogicSystem, ResourceManager) {
  var SpriteResourceSystem = LogicSystem.extend({
    init: function() {
      this.LogicSystem('SpriteResource');
      this.SpriteResourceSystem();

    
    // SpriteResourceSystem constructor
    SpriteResourceSystem: function() {
      this.resourceManager = new ResourceManager;
    },
    
    component: function(resource, callback) {
      this.resourceManager(resource, function() {
        
      });
    },

  });
  
  new SpriteResourceSystem;
});
