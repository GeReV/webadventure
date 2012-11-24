define([
  'core/component',
  'subsystems/physics',
  'subsystems/positioncomponent'
  ], function(Component, Physics , PositionComponent) {
  var PhysicComponent = Component.extend({
    init: function(positionComponent) {
      this.Component('physic');
      this.PhysicComponent(positionComponent);
    },
    
    // PhysicComponent constructor
    PhysicComponent: function(positionComponent) {
      this.positionComponent = positionComponent;
      Physics.add(this);
    },
    
    update: function(physics, t, dt) {
      
    }
  });
  
  return PhysicComponent;
});
