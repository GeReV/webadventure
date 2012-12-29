define([ 
  'core/outputsystem',
  'util/vector'
  ], function(OutputSystem, Vector) {
  var OutputTransformSystem = OutputSystem.extend({
    init: function() {
      this.LogicSystem('OutputTransform', TransformComponent);
      this.TransformSystem();
    },
    
    // OutputTransformSystem constructor
    OutputTransformSystem: function() {
      
    },
    
    constructComponent: function() {
      return {position: new Vector};
    },
    
    proccess: function(t, dt) {
       for (var i = 0, entity; entity = this.entities[i]; i++) {
         var transformComp = entity.get('Transform'),
             directionComp = entity.get('Direction'),
             speedComp = entity.get('Speed'),
             outputTransformComp = entity.get('OutputTransform'),
             playerTimeComp = entity.get('PlayerTime'),
             dt = dt * playerTimeComp.multiplier;
             
         outputTransformComp.position = transformComp.position.add(directionComp.direction.multiply(speedComp.speed * dt));  
       };
    },
  });
  
  new OutputTransformSystem;
});
