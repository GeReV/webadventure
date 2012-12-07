define([
  'core/core', 
  'core/outputsystem',
  'util/renderer'
  ], function(Core, OutputSystem, Renderer) {
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
    
    constructComponent: function(outputTransformComp, sprite) {
      return {outputTransformComp: outputTransformComp, sprite: sprite};
    },
    
    proccess: function(t, dt) {
      this.renderer.clear();
      for (var i = 0, component; component = this.components[i]; i++) {
        this.renderer.drawSprite(
          component.sprite,
          component.outputTransformComp.position.x,
          component.outputTransformComp.position.y
        );
      };
    },
  });
  
  new RenderSystem;
});
