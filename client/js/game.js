define(['subsystems/renderer', 'subsystems/physics', 'subsystems/resourcemanager', 'subsystems/network', 'core/entity', 'core/viewport', 'core/sprite', 'entities/tilemap', 'entities/player'], function(Renderer, Physics, ResourceManager, Network, Entity, Viewport, Sprite, TileMap, Player) {
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
      this._initNetwork();
    },
    _initAssets: function() {
      var that = this;
      
      this.player = new Player(new Sprite(image, image.width, image.height), 0, 0, true);
      
      ResourceManager.add('img/crono.png', function(image) {
        that.entities.push();
      });
    },
    _initRenderer: function(canvas) {
      this.renderer = new Renderer(canvas, this.viewport);
    },
    
    _initPhysics: function() {
      this.physics = new Physics();
      this.physics.tileMap = this.tileMap;
    },
    
    _initNetwork: function() {
      var that = this,
          network;
      
      this.clients = {};
      
      this.network = network = new Network('10.0.0.169', 4004);
      
      network.onConnect = function(data) {
        
        that.player.userId = data.id;
        
        // Add the connected clients.
        for (var i=0, l=data.clients.length; i < l; i++) {
          that._addNetworkPlayer(data.clients[i]);
        }
      };
      
      network.onClientConnected = function(userId) {
        that._addNetworkPlayer.call(that, userId);
      };
      
      network.onClientDisconnected = function(userId) {
        var player = that.clients[userId];
        
        delete that.clients[userId];
        
        var i = that.entities.indexOf(player);
        
        that.entities.splice(i, 1); // Remove player from the entities.
      };
      
      network.subscribe(function(data) {
        var userId = data.userid,
            player = that.clients[userId];
            
        // TODO: Do something with player.
      });
    },
    
    _addNetworkPlayer: function(userId) {
      var player = null; // Set this to a new NetworkPlayer or whatever.
        
      that.clients[userId] = player;
      
      that.entities.push(player);
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