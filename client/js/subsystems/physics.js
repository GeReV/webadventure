define(['core/entity'], function() {
  var Physics = Class.extend({
    init: function() {
      this.entities = [];
    },
    
    translate: function(entities) {
      
    },
    
    canMoveTo: function(entity) {
      if (!this.tileMap.isPassableByXY(entity.x, entity.y)) {
        return false;
      }
      
      if(this.tileMap.width * this.tileMap.tileWidth < entity.x + entity.width || 
        this.tileMap.height * this.tileMap.tileHeight < entity.y + entity.width)
        return false
      
      return true;
    } 
  });
  
  return Physics;
});