define([
  'core/logicsystem',
  'util/vector'
  ], function(LogicSystem, Vector) {
  var TransformSystem = LogicSystem.extend({
    init: function() {
      this.LogicSystem('Position');
      this.TransformSystem();
    },
    
    // TransformSystem constructor
    TransformSystem : function() {
      
    },
    
    component: function(pX, pY, rX, rY) {
      return {position: new Vector(pX || 0, pY || 0), rotation: new Vector(rX || 0, rY || 0)};
    },

  });
  
  new TransformSystem;
});
