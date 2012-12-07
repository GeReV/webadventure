define([
  'core/logicsystem',
  'util/vector'
  ], function(LogicSystem, Vector) {
  var DirectionSystem = LogicSystem.extend({
    init: function() {
      this.LogicSystem('Direction');
      this.DirectionSystem();
    },
    
    // DirectionSystem constructor
    DirectionSystem: function() {
      
    },
    
    constructComponent: function(x, y) {
      return {direction: new Vector(x || 0 , y || 0)};
    },
  });
  
  new DirectionSystem();
});
