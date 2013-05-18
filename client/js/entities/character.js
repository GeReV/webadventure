define([
  'core/entity',
  'core/vector', 
  'core/sprite'
  ], function(Entity, Vector, Sprite) {
  var Character = Entity.extend({
    init: function(game, sprite, x, y, width, height, isAlive) {
      this.game = game;
      this.sprite = sprite;
      this.x = +x || 0;
      this.y = +y || 0;
      this.width = +width || 0;
      this.height = +height || 0;
      this.direction = new Vector(0,0);
      this.speed = new Vector(0,0);
      
      // chareacter
      this.isAlive = isAlive;
    },
  });
  
  return Character;
});
