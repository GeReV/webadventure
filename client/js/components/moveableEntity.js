define(['sprite', ['vector']], function(Sprite) {
  var MoveableEntity = Entity.extend({
    init: function(img, x, y, width, height, opacity) {
      // entitiy
      this.img = img;
      this.x = +x || 0;
      this.y = +y || 0;
      this.width = +width || 0;
      this.height = +height || 0;
      this.opacity = +opacity || 1;
      
      // MoveableEntity
      this.direction = new Vector(0,0);
      this.speed = new Vector(0,0);
    },
  });
  
  return MoveableEntity;
});
