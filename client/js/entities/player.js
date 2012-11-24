define([
  'core/vector',   
  'components/inputcomponent',
  'components/physiccompoenents/collidablecomponent',
  'components/physiccompoenents/forcecomponent',
  'components/rendercompoenents/spritecomponent',
  'components/triggercomponent',
  'components/inputcompoenents/inputtriggercomponent'
  ], function(Vector, InputComponent, CollidableComponent, ForceComponent, SpriteComponent, TriggerComponent, InputTriggerComponent) {
  var Player = Character.extend({
    init: function(sprite, x, y, isAlive) {
      var position = new PositionComponent(x,y),
          force = new ForceComponent(position, new Vector(0,0), 160),
          // collidable = new CollidableComponent(), // btw the order of creating the components does matter and very important 
          render = new SpriteComponent(position, false, sprite),
          keys = {up: 'w', down: 's', left: 'a', right: 'd'},
          triggerUp = new TriggerComponent(function() {
              force.direction.y = -1;
            }, this),
          triggerDown = new TriggerComponent(function() {
              force.direction.y = 1;
            }, this),
          triggerLeft = new TriggerComponent(function() {
              force.direction.x = -1;
            }, this),
          triggerRight = new TriggerComponent(function() {
              force.direction.x = 1;
            }, this),
          upInput = new KeyTriggerComponent(triggerUp, keys.up),
          downInput = new KeyTriggerComponent(triggerDown, keys.down),
          leftInput = new KeyTriggerComponent(triggerLeft, keys.left),
          rightInput = new KeyTriggerComponent(triggerRight, keys.right);      
    },
  });
  
  return Player;
});
