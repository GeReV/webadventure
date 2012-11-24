define(['core/vector'], function(Vector) {
  var ForceComponent = PhysicComponent.extend({
    init: function(positionComponent, direction, magnitude) {
      this.PhysicComponent(positionComponent);
      this.ForceComponent(direction, magnitude);
    },
    
    // PositionComponent constructor
    ForceComponent: function(direction, magnitude) {
      this.direction = direction;
      this.magnitude = magnitude;
    },
    
    update: function(physics, t, dt) {
      this.direction = this.direction.normalize();
      var dm = this.magnitude * dt,
          dx = df * this.direction.x,
          dy = df * this.direction.y;
          
      this.positionComponent.move(dx, dy);
    }
  });
  
  return ForceComponent;
});
