define([
    'core/sprite',
    'core/vector',
    'core/state'
  ], function(Sprite, Vector, State) {
    
  var Entity = Class.extend({
    init: function(game, sprite, x, y, width, height) {
      this.game = game;
      this.sprite = sprite;
      
      this.direction = new Vector;
      
      this.isCollidable = true;
      
      this.width = +width || 0;
      this.height = +height || 0;
      
      this.state = this.previousState = new State({
        x: State.lerp(+x || 0),
        y: State.lerp(+y || 0),
        speed: State.snap(0)
      });
    },
    
    position: function(x, y) {
      if (arguments.length <= 0) {
        return [this.state.x, this.state.y];
      }
      
      this.state.x = Math.max(+x || 0, 0);
      this.state.y = Math.max(+y || 0, 0);
      
      this.screenX = this.state.x - this.game.viewport.x;
      this.screenY = this.state.y - this.game.viewport.y;
      
      return this;
    },
    
    move: function(x, y) {
      return this.position(this.state.x + x, this.state.y + y);
    },
    
    isAlive: function() {
      return !!this.alive;
    },
     
    distanceToEntity: function(entity) {
      var distX = Math.abs(entity.gridX - this.gridX);
      var distY = Math.abs(entity.gridY - this.gridY);

      return Math.sqrt(distX * distX + distY * distY);
    },
    
    invisible: function() {
      this.opacity = 0;
      
      return this;
    },
    
    isVisible: function() {
      return this.opacity <= 0;
    },
    
    render: function(renderer, interpolation) {
      var state = this.previousState.interpolate(this.state, interpolation);
      
      this.draw(renderer, state);
    },
    
    draw: function(renderer, state) {
      renderer.render(this.sprite, state.x, state.y);
    },
    
    update: function(physics, t, dt) {
      this.sprite.update(physics, t, dt);
    },
    
    getFrame: function() {
      return this.currentAnimation && this.currentAnimation.getFrame();
    },
    
    translate: function() {}
    
  });
  
  return Entity;
});
