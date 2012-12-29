define([
  'core/entity',
  'util/resources/resourcemanager'
  ], function(Entity, ResourceManager) {
  var PlayerEntity = Entity.extend({
    init: function() {
      this.Entity();
      this.PlayerEntity();
    },
    
    // PlayerEntity constructor
    PlayerEntity: function() {
      this.add('PlayerTime')
          .add('Transform', 1, 1)
          .add('Direction', 0, 1)
          .add('Speed', 5)
          .add('PlayerInput', {up: 'w', down: 's', left: 'a', right: 'd'})
          .add('OutputTransform');
      
          ResourceManager.add('crono.png', function(sprite) {
            this.add('SpriteRender', sprite);
          });
    },
  });
  
  return PlayerEntity;
});
