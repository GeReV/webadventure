define(['core/entity'], function() {
  var Physics = Class.extend({
    init: function() {
      this.entities = [];
    },
    
    translate: function(entities) {
      
    },
    
    canMoveTo: function(entity) {
      var x, y, position = entity.position();
      
      x = position[0];
      y = position[1];
      
      if (!this.tileMap.isPassableByXY(x, y)) {
        return false;
      }
      
      if(this.tileMap.width * this.tileMap.tileWidth < x + entity.width || 
        this.tileMap.height * this.tileMap.tileHeight < y + entity.width)
        return false;
      
      return true;
    } 
  });
  
  return Physics;
});