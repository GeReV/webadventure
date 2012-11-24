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
          upInput = new InputTriggerComponent(
            new TriggerComponent(function() {
              force.direction.y = -1;
            }, this), 
            function(input) {
              if(input.keyboard.pressed(keys.up))
                return true;
            }),
          downInput = new InputTriggerComponent(
            new TriggerComponent(function() {
              force.direction.y = 1;
            }, this), 
            function(input) {
              if(input.keyboard.pressed(keys.down))
                return true;
            }),
          leftInput = new InputTriggerComponent(
            new TriggerComponent(function() {
              force.direction.x = -1;
            }, this), 
            function(input) {
              if(input.keyboard.pressed(keys.left))
                return true;
            }),
          rightInput = new InputTriggerComponent(
            new TriggerComponent(function() {
              force.direction.x = 1;
            }, this),
            function(input) {
              if(input.keyboard.pressed(keys.right))
                return true;
            });      
    },
  });
  
  return Player;
});
