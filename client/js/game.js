define(['subsystems/renderer', 'subsystems/physics', 'core/entity', 'entities/tilemap'], function(Renderer, Physics, Entity, TileMap) {
    
  var Game = Class.extend({
    init: function() {
      this.initRenderer(document.getElementById('canvas'));
      this.initPhysics();
      this.entities = [];
      this.fps = 30;
      
      this.entities.push(new TileMap);
    },
        
    initRenderer: function(canvas) {
      this.renderer = new Renderer(canvas);
    },
    
    initPhysics: function() {
      this.physics = new Physics();
    },
    
    draw: function(interpolation) {
      this.renderer.clear();
      
      for (var i = 0, entity; entity = this.entities[i]; i++)
        entity.render(this.renderer);
    },
    
    update: function () {
      this.physics.translate(this.entities);
    },
    
    run: function() {
      var loops = 0, 
          skipTicks = 1000 / this.fps,
          maxFrameSkip = 10,
          nextGameTick = Game.localTime = window.perfNow(),
          lastGameTick,
          that = this,
          tick = function() {
            loops = 0;
        
            while (window.perfNow() > nextGameTick) {
              that.update();
              nextGameTick += skipTicks;
              loops++;
            }
        
            if (!loops) {
              that.draw((nextGameTick - window.perfNow()) / skipTicks);
            } else {
              that.draw(0);
            }
            
            window.requestAnimationFrame(tick);
          };
          
      window.requestAnimationFrame(tick);
    },

    getTime: function() {
      return Game.localTime;
    }
  });
  
  return Game;
});