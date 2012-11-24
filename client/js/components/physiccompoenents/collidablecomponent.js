define(['components/physiccomponent'], function(PhysicComponent) {
  var CollidableComponent = PhysicComponent.extend({
    init: function(positionComponent, boundaries) {
      this.Component('collidable');
      this.PhysicComponent(positionComponent);
      this.CollidableComponent(boundaries);
    },
    
    // CollidableComponent constructor
    CollidableComponent: function(boundaries) {
      this.boundaries = boundaries; 
    },
    
    update: function(physics, t, dt) {
      for(var i = 0, component; component = this.collidable[i]; i++) {
        // check if this.positionComponent.state to positionComponent.previuseState crosses any other pathes
      };
    }
  });
  
  return CollidableComponent;
});
