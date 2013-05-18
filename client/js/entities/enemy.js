define([
  'core/sprite',
  'core/vector'
  ], function(Sprite, Vector) {
  var Enemy = Character.extend({
    init: function(sprite, x, y, width, height, isAlive) {
      // entitiy
      this.sprite = sprite;
      this.x = +x || 0;
      this.y = +y || 0;
      this.width = +width || 0;
      this.height = +height || 0;
      
      // MoveableEntity
      this.direction = new Vector(0,0);
      this.speed = new Vector(0,0);
      
      // chareacter
      this.isAlive = isAlive;
    },
  });
  
  return Chareacter;
});
