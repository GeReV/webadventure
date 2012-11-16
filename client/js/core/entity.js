define(['core/sprite'], function(Sprite) {
  var Entity = Class.extend({
    init: function(sprite, x, y) {
      this.sprite = sprite;
      this.x = +x || 0;
      this.y = +y || 0;
      this.direction = new Vector(0,0);
      this.speed = new Vector(0,0);
      this.isCollidable = true;
    },
    
    position: function(x, y) {
      if (arguments.length <= 0) {
        return [x, y];
      }
      
      x && (this.x = x);
      y && (this.y = y);
      
      return this;
    },
    
    isAlive: function() {
      return !!this.alive;
    },
    
    gridPosition: function(x, y) {
      if (arguments.length <= 0) {
        return [this.gridX, this.gridY];
      }
      
      x && (this.gridX = x);
      y && (this.gridY = y);
    
      this.position(x * 32, y * 32);
      
      return this;
    },
     
    distanceToEntity: function(entity) {
      var distX = Math.abs(entity.gridX - this.gridX);
      var distY = Math.abs(entity.gridY - this.gridY);

      return Math.sqrt(distX * distX + distY * distY);
    },
    
        invisible: function() {
      this.opacity = 0;
      
      return this;
    },
    
    isVisible: function() {
      return this.opacity <= 0;
    },
    
    render: function() {
      
    },
    
  });
  
  return Entity;
});
