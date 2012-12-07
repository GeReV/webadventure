define([
  'core/sprite',
  'components/rendercomponent'
  ], function(Sprite, RenderComponent) {
  var SpriteComponent = RenderComponent.extend({
    init: function(positionComponent, isTransperet, sprite) {
      this.RenderComponent(positionComponent, isTransperet);
      this.SpriteComponent(sprite);
      this.Component('sprite');
    },
    
    // SpriteComponent constructor
    SpriteComponent: function(sprite) {
      this.sprite = sprite;
    },
    
    render: function(renderer) {
      renderer.render(
        this.sprite, 
        this.positionComponent.state.x,
         this.positionComponent.state.y
      );
    }
  });
  
  return SpriteComponent;
});
