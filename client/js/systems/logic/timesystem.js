define([
  'core/logicsystem',
  ], function(LogicSystem, Vector) {
  var TimeSystem = LogicSystem.extend({
    init: function() {
      this.LogicSystem('Time');
      this.TimeSystem();
    },
    
    // PlayerTimeSystem constructor
    TimeSystem: function() {
      this.component = {t: 0, dt: 0, multiplier: 1};  
    },
    
    component: function() {
      return this.component;
    },
    
    proccess: function(t, dt) {
      this.component.dt = this.component.multiplier * dt;
      this.component.t += this.component.dt; 
    },
  });
  
  new TimeSystem();
});
