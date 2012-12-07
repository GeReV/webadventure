define([
  'core/logicsystem'
  ], function(LogicSystem) {
  var SpeedSystem = LogicSystem.extend({
    init: function() {
      this.LogicSystem('Speed');
      this.SpeedSystem();
    },
    
    // SpeedSystem constructor
    SpeedSystem: function() {
      
    },
    
    constructComponent: function(speed, transformComp, directionComp) {
      return {speed: speed, transformComp: transformComp, lastPosition: transformComp.position, directionComp: directionComp};
    },
    
    proccess: function(t, dt) {
      for (var i = 0, component; component = this.components[i]; i ++) {
        var transformComp = component.transformComp,
            directionComp = component.directionComp;
            
        component.lastPosition = component.transformComp.position; 
        transformComp.position = transformComp.position.add(directionComp.direction.multiply(component.speed * dt)); 
      };
    },
  });
  
  new SpeedSystem;
});
