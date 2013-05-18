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
      
      this.updateInterval = 0.03; // update each interval in seconds
      
      this.entities = [];
    },
    
    _initAssets: function(callback) {
      ResourceManager.add(['/img/grass.png', '/img/rock.png', '/img/friend.png', '/img/crono_sheet.png', '/img/crono_sheet.json'], callback.bind(this));
    },
    
    _initPlayer: function() {
      var image = ResourceManager.get('crono_sheet.png'),
          frames = ResourceManager.get('crono_sheet.json'),
          sprite = new Sprite(image, frames);
      
      this.player = new NetworkPlayer(this, sprite, 0, 0, frames.stand[0][2], frames.stand[0][3]);
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
      
      this.network = network = new Network('127.0.0.1', 4004);
      
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
    
    render: function(interpolation) {
      var renderer = this.renderer;
      
      //renderer.clear();
      
      this.tileMap.render(renderer, interpolation);
      
      for (var i = 0, entity; entity = this.entities[i]; i++) {
        entity.render(renderer, interpolation);
      }
    },
    
    update: function (t, dt) {
      for (var i = 0, entity; entity = this.entities[i]; i++) {
        entity.networkUpdate && entity.networkUpdate(this.network);
        entity.update(this.physics, t, dt);
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
      var time = 0,
          deltaTime = this.updateInterval,
          currentTime = window.perfNow() / 1000, // Maybe delegate this to an outer Timer class.
          newTime = 0,
          frameTime = 0,
          accumulator = 0,
          alpha,
          that = this;
        
      function frameUpdate() {
        newTime = window.perfNow() / 1000,
        frameTime = newTime - currentTime;
        
        if (frameTime > deltaTime * 10) {
          frameTime = deltaTime * 10; // avoiding spiral of death
        } 

        currentTime = newTime;
        
        accumulator += frameTime;
    
        while(accumulator >= deltaTime) {
          that.update(time, deltaTime);
          
          time += deltaTime;
          accumulator -= deltaTime
        }
        
        alpha = accumulator / deltaTime;
    
        that.render(alpha);
                    
        window.requestAnimationFrame(frameUpdate);
      };

      window.requestAnimationFrame(frameUpdate);
    },

    getTime: function() {
      return Game.localTime;
    }
  });
  
  return Game;
});