define(['entity/character', 'core/sprite', 'core/vector'], function(Character, Sprite, Vector) {
  var Player = Character.extend({
    init: function(img, x, y, width, height, opacity, isAlive) {
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
      
      // chareacter
      this.isAlive = isAlive;
    },
  });
  
  return Player;
});
