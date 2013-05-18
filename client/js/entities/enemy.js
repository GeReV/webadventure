define([
  'core/sprite',
  'core/vector'
  ], function(Sprite, Vector) {
  var Enemy = Character.extend({
    init: function(game, sprite, x, y, width, height, isAlive) {
      this._super(game, sprite, x, y, width, height, isAlive);
    },
  });
  
  return Enemy;
});
