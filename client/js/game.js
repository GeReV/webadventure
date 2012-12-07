// systems loading order is the same order they will be activated
define([
  'core/core',
  'systems/logic/transformsystem',
  'systems/logic/directionsystem',
  'systems/logic/playerinputsystem',
  'systems/logic/speedsystem',
  'systems/output/outputtransformsystem',
  'systems/output/spriterendersystem',
  
  'systems/templates/playertemplate', // think about a nice way to initialize the engine with templates
  ], function(Core, PlayerTemplate) {
  var Game = Class.extend({
    init: function() {
      new PlayerAssemblage;
    },
    
    run: function() {
      Core.run();
    },
    
    
    
    /*
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
      Renderer.render(t, interpolation);
      //this.tileMap.render(renderer, interpolation);
    },
    
    update: function (t, dt) {
      Input.recive(t, dt);
      Physics.update(t, dt);
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
    
        that.render(time + alpha, alpha);
                    
        window.requestAnimationFrame(frameUpdate);
      };

      window.requestAnimationFrame(frameUpdate);
    },
    
    */
  });
  
  return Game;
});