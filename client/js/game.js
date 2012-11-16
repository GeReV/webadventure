define(["renderer", "entity"], function(Renderer, Entity) {
    
  var Game = Class.extend({
    init: function() {
      this.initRenderer(document.getElementById("canvas"));
      this.entities = [];
      this.fps = 30;
    },
        
    initRenderer: function(canvas) {
      this.renderer = new Renderer(canvas);
    },
    
    draw: function(interpolation) {
      this.renderer.clear();
      
      for (var i = 0, entitiy; entitiy = this.entities[i]; i++)
        this.renderer.render(entity);
        
      this.renderer.render(new Entity(null, 5,5,92,92)); // remove later
    },
    
    update: function (timediff) {
      
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