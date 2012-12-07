define([ 
  'systems/logic/speedsystem'
  ], function(SpeedSystem) {
  var OutputTransformSystem = SpeedSystem.extend({
    init: function() {
      this.LogicSystem('OutputTransform', TransformComponent);
      this.TransformSystem();
    },
    
    // OutputTransformSystem constructor
    OutputTransformSystem: function() {
      
    },
    
    constructComponent: function(speedComp) {
      return {speedComp: speedComp};
    },
    
    proccess: function(t, dt) {
       for (var i = 0, component; component = this.components[i]; i++) {
         var transformComp = component.speedComp.transformComp,
             directionComp = component.speedComp.directionComp;
             
         component.transformComp.position = transformComp.position.add(directionComp.direction.multiply(component.speed * dt));  
       };
    },
  });
  
  new OutputTransformSystem;
});
