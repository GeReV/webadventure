define([
  'core/component',
  'subsystems/renderer',
  'subsystems/positioncomponent', 
  ], function(Component, Renderer, PositionComponent) {
  var RenderComponent = Component.extend({
    init: function(positionComponent, isTransperet) {
      this.Component('render');
      this.RenderComponent(positionComponent, isTransperet);
    },
    
    // InputComponent constructor
    RenderComponent: function(positionComponent, isTransperet) {
      this.positionComponent = positionComponent;
      Renderer.add(this);
      this.isTransperet = isTransperet; // if any transperency present
    },
    
    // called by renderer
    render: function(renderer, t, dt) {
      
    }
  });
  
  return RenderComponent;
});
