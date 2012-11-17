define([
  'subsystems/renderer',
  'subsystems/physics', 
  'subsystems/resourcemanager', 
  'subsystems/network', 
  'core/entity', 
  'core/viewport', 
  'core/sprite', 
  'entities/tilemap', 
  'entities/player',
  'entities/networkcharacter',
  'entities/networkplayer',
  ], function(Renderer, Physics, ResourceManager, Network, Entity, Viewport, Sprite, TileMap, Player, NetworkCharacter, NetworkPlayer) {
  var Game = Class.extend({
    init: function() {
      var canvas = document.getElementById('canvas');
      
      this.fps = 30;
      
      this.entities = [];
      
    },
    
    _initAssets: function(callback) {
      ResourceManager.add(['img/grass.png', 'img/rock.png', 'img/crono.png', 'img/friend.png'], callback.bind(this));
    },
    
    _initPlayer: function() {
      var image = ResourceManager.get('crono.png'),
          sprite = new Sprite(image, image.width, image.height);
      
      this.player = new NetworkPlayer(this, sprite, 0, 0);
      this.entities.push(this.player);
    },
    
    _initRenderer: function(canvas) {
      this.renderer = new Renderer(canvas, this.viewport);
    },
    
    _initPhysics: function() {
      this.physics = new Physics();
      this.physics.tileMap = this.tileMap;
    },
    
    _initNetwork: function() {
      var network;
      
      this.clients = {};
      
      this.network = network = new Network('10.0.0.169', 4004);
      
      network.onConnect = (function(data) {
        
        this.player.userId = data.id;
        
        // Add the connected clients.
        for (var i=0, l=data.clients.length; i < l; i++) {
          this._addNetworkPlayer(data.clients[i]);
        }
      }).bind(this);
      
      network.onClientConnected = (function(userId) {
        this._addNetworkPlayer(userId);
      }).bind(this);
      
      network.onClientDisconnected = (function(userId) {
        var player = this.clients[userId];
        
        delete this.clients[userId];
        
        var i = this.entities.indexOf(player);
        
        this.entities.splice(i, 1); // Remove player from the entities.
      }).bind(this);
      
      network.subscribe( (function(data) {
        var userId = data.userid,
            player = this.clients[userId];

        player.position(data.position[0], data.position[1]);
      }).bind(this));

      network.connect();
    },
    
    _addNetworkPlayer: function(userId) {
      var sprite = new Sprite( ResourceManager.get('friend.png') ),
          player = new NetworkCharacter(this, sprite, 0,0, true, userId); // Set this to a new NetworkPlayer or whatever.
        
      this.clients[userId] = player;
      
      this.entities.push(player);
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
        entity.networkUpdate && entity.networkUpdate(this.network);
        entity.update();
        entity.translate(this.physics);        
      }
    },
    
    start: function() {
      this._initAssets(function() {
        this.tileMap = new TileMap(50, 50);
      
        this.viewport = new Viewport(canvas.width, canvas.height, this.tileMap.height * this.tileMap.tileHeight, this.tileMap.width * this.tileMap.tileWidth);
        
        this._initPlayer();
        this._initRenderer(canvas);
        this._initPhysics();
        this._initNetwork();
        
        this.run();
      });
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