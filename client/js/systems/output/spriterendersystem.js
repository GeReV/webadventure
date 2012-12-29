define([
  'core/outputsystem',
  'util/Render2D/renderer'
  ], function(OutputSystem, Renderer) {
  var SpriteRenderSystem = OutputSystem.extend({
    init: function() {
      this.OutputSystem('SprtieRender');
      this.RenderSystem();
    },
    
    // SpriteRenderSystem constructor
    SpriteRenderSystem: function() {
      var canvas = document.getElementById('canvas');
      this.renderer = new Renderer(canvas)
    },
    
    constructComponent: function(sprite) {
      return {outputTransformComp: outputTransformComp, sprite: sprite};
    },
    
    proccess: function(t, dt) {
      this.renderer.clear();
      for (var i = 0, entity; entity = this.entities[i]; i++) {
        var spriteComp = entity.get('SprtieRender'),
            outputTransformComp = entity.get('OutputTransform');
        
        this.renderer.drawSprite(
          spriteComp.sprite,
          outputTransformComp.position.x,
          outputTransformComp.position.y
        );
      };
    },
  });
  
  new RenderSystem;
});
