define([
  'core/logicsystem',
  'util/vector'
  ], function(LogicSystem, vector) {
  var SpeedSystem = LogicSystem.extend({
    init: function() {
      this.LogicSystem('Speed');
      this.SpeedSystem();
    },
    
    // SpeedSystem constructor
    SpeedSystem: function() {
      
    },
    
    component: function(speed, lastPosition) {
      return {speed: speed || 0}
    },
    
    proccess: function() {
      for (var i = 0, entity; entity = this.entity[i]; i++) {
        var transformComp = entity.get('Transform'),
            directionComp = entity.get('Direction'),
            speedComp = entity.get('Speed'),
            dt = entity.get('Time').dt;
            
        transformComp.position = transformComp.position.add(directionComp.direction.multiply(speedComp.speed * dt)); 
      };
    },
  });
  
  new SpeedSystem;
});
