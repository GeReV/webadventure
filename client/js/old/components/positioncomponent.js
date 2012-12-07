define([
  'core/component',
  'core/vector'
  ], function(Vector) {
  var PositionComponent = Component.extend({
    init: function(x, y) {
      this.Component('position');
      this.PositionComponent(x, y);
    },
    
    // PositionComponent constructor
    PositionComponent: function(x, y) {
      this.state = this.previousState = new State({
        x: State.lerp(+x || 0),
        y: State.lerp(+y || 0),
      }); 
    },
    
    position: function(x, y) {
      if (arguments.length <= 0) {
        return [this.state.x, this.state.y];
      }
      
      this.state.x = +x;
      this.state.y = +y;
      
      return this;
    },
    
    move: function(x, y) {
      return this.position(this.x + x, this.y + y);
    },
    
    distance: function(positionComponent) {
      var distX = Math.abs(positionComponent.state.x - this.state.x);
      var distY = Math.abs(positionComponent.state.y - this.state.y);

      return Math.sqrt(distX * distX + distY * distY);
    },
  });
  
  return PositionComponent;
});
