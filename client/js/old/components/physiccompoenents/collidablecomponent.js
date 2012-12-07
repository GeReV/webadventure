define(['components/physiccomponent'], function(PhysicComponent) {
  var CollidableComponent = PhysicComponent.extend({
    init: function(positionComponent, boundaries) {
      this.PhysicComponent(positionComponent);
      this.CollidableComponent(boundaries);
      this.Component('collidable');
    },
    
    // CollidableComponent constructor
    CollidableComponent: function(boundaries) {
      this.boundaries = boundaries; 
    },
    
    update: function(physics, t, dt) {
      for(var i = 0, component; component = this.collidable[i]; i++) {
        // check if this.positionComponent.state to positionComponent.previuseState crosses any other pathes, if does fix it to the right position
      };
    }
  });
  
  return CollidableComponent;
});
