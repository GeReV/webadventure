define(['entity/character', 'core/sprite', 'core/vector'], function(Character, Sprite, Vector) {
  var Player = Character.extend({
    init: function(sprite, x, y, isAlive) {
      this.sprite = sprite;
      this.x = +x || 0;
      this.y = +y || 0;
      this.direction = new Vector(0,0);
      this.speed = new Vector(5,5);
      
      // chareacter
      this.isAlive = isAlive;
      
    },
  });
  
  return Player;
});
