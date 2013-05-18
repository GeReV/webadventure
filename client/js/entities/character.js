define([
  'core/entity',
  'core/sprite'
  ], function(Entity, Vector, Sprite) {
  var Character = Entity.extend({
    init: function(game, sprite, x, y, width, height, isAlive) {
      this._super(game, sprite, x, y, width, height);
      
      this.isAlive = isAlive;
    },
  });
  
  return Character;
});
