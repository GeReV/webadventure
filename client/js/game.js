define(["render", "polygon"], function() {
  var Game = Class.extend({
    init: function() {
      this.initRender();
      
    },
    
    initRender: function() {
      var canvas = new canvas();
      this.render = new Render(canvas);
      window.append(canvas);
    },
    
    draw: function(interpolation) {
      this.render.render();
    },
    
    update: function (timediff) {
      
    },
    
    run: function() {
      var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = Game.localTime = window.perfNow(),
        lastGameTick;
  
        var tick = function() {
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
      }
  });
  
  return Game;
});