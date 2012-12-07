define([
  'core/template', 
  ], function(Template) {
  var PlayerAssemblage = Class.extend({
    init: function() {
      this.Template('Player');
      this.PlayerTemplate();
    },
    
    // PlayerTemplate constructor
    PlayerAssemblage: function() {
      this.transformComp = this.core.systems.Position.create(1,1),
      this.directionComp = this.core.systems.Direction.create(0,0),
      this.playerInputComp = this.core.systems.PlayerInput.create(this.directionComp, {up: 'w', down: 's', left: 'a', right: 'd'}),
      this.speedComp = this.core.systems.Speed.create(5, this.transformComp, this.directionComp),
      this.outputTransformComp = this.core.systems.OutputTransform.create(this.speedComp),
      this.spriteRenderComp = this.core.systems.SpriteRender.create(this.outputTransformComp, ???????sprite);
    },
  });
  
  return PlayerTemplate;
});
