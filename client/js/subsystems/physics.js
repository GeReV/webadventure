define(['core/entity'], function() {
  var Physics = Class.extend({
    init: function() {
      this.entities = [];
    },
    
    translate: function(entities) {
      // TODO: addd collisionn  checks later
      for (var i = 0, entity; entity = this.entities[i]; i++) {
        // check collision before moving the entity
        entity.gridPosition(entity.speed.x * entity.direction.x, entity.speed.y * entity.direction.y);
      }
    }, 
  });
  
  return Physics;
});