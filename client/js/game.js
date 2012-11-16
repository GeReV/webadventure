define(['subsystems/renderer', 'subsystems/physics', 'subsystems/resourcemanager', 'core/entity', 'core/viewport', 'core/sprite', 'entities/tilemap', 'entities/player'], function(Renderer, Physics, ResourceManager, Entity, Viewport, Sprite, TileMap, Player) {
  var Game = Class.extend({
    init: function() {
      var canvas = document.getElementById('canvas');
      this.fps = 30;
      
      this.entities = [];
      
      this.tileMap = new TileMap(50, 50);
      
      this.viewport = new Viewport(canvas.width, canvas.height, this.tileMap.height * this.tileMap.tileHeight, this.tileMap.width * this.tileMap.tileWidth);
      
      this._initAssets();
      this._initRenderer(canvas);
      this._initPhysics();
    },
    _initAssets: function() {
      var that = this;
      
      ResourceManager.add('img/crono.png', function(image) {
        that.entities.push(new Player(new Sprite(image, image.width, image.height), 0, 0, true));
      });
    },
    _initRenderer: function(canvas) {
      this.renderer = new Renderer(canvas, this.viewport);
    },
    
    _initPhysics: function() {
      this.physics = new Physics();
      this.physics.tileMap = this.tileMap;
    },
    
    draw: function(interpolation) {
      var renderer = this.renderer;
      
      //renderer.clear();
      
      this.tileMap.render(renderer);
      
      for (var i = 0, entity; entity = this.entities[i]; i++) {
        entity.render(renderer);
      }
    },
    
    update: function () {
      for (var i = 0, entity; entity = this.entities[i]; i++) {
        entity.update();
        entity.translate(this.physics);        
      }
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