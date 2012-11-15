define(['sprite'], function(Sprite) {
  var Entity = Sprite.extend({
    init: function(img, x, y, width, height, opacity) {
      Sprite.prototype.init.call(this);
      
      this.alive = true;
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
  });
});
