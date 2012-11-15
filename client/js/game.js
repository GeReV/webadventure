define(["render", "world"], function() {
    
  var Game = Class.extend({
    init: function() {
      this.initRender(document.getElementById("canvas"));
      this.initWorld();
    },
        
    initWorld: function() {
      this.world = new World();
    },
    
    initRender: function(canvas) {
      this.render = new Render(canvas);
    },
    
    draw: function(interpolation) {
      this.render.render(this.world.entities);
    },
    
    update: function (timediff) {
      this.world.update(timediff);
    },
    
    run: function() {
      var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = Game.localTime = window.perfNow(),
        lastGameTick,   
        tick = function() {
          loops = 0;
      
          while (window.perfNow() > nextGameTick) {
            Game.update();
            nextGameTick += skipTicks;
            loops++;
          }
      
          if (!loops) {
            Game.draw((nextGameTick - window.perfNow()) / skipTicks);
          } else {
            Game.draw(0);
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