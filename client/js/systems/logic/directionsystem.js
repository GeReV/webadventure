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
    
    component: function() {
      return {direction: new Vector};
    },
  });
  
  new DirectionSystem();
});
