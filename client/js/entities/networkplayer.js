define(['subsystems/keyboardhandler', 'entities/character', 'core/sprite', 'core/vector', 'core/state', 'entities/player'], function(Keyboardhandler, Character, Sprite, Vector, State, Player) {
  var NetworkPlayer = Player.extend({
    init: function(game, sprite, x, y, isAlive) {
      this.game = game;
      this.sprite = sprite;
      this.width = sprite.width;
      this.height = sprite.height;
      this.direction = new Vector(0,0);
      this.speed = 8;
      
      this.state = this.previousState = new State({
        x: +x || 0,
        y: +y || 0
      });
      
      // chareacter
      this.isAlive = isAlive || true;
      
      //player
      this.keyBind = {up: 'w', down: 's', left: 'a', right: 'd'}
      this.keyboardhandler = new Keyboardhandler([
        this.keyBind.up,
        this.keyBind.down,
        this.keyBind.left,
        this.keyBind.right
      ]);
      
      // network player  
      this.userID = "";
      this.nextPosition = new Vector;
      this.timeStamp = 0;
      this.nextTimeStamp = 0;
      this.direction = new Vector;
      this.nextDirection = new Vector;
      
    },
    
    networkUpdate: function(network) {
      //var networkData = network.getData(); 
      //this.nextTimeStamp = networkData.timeStamp;
      
      // make sure server authorithed that movement
      //if(this.lastPosition.x != networkData.position.x || this.lastPosition.y != networkData.position.y )
        //this.position(networkData.position.x, networkData.position.y);  
      
      //this.lastPosition = this.position;
      
      //console.log('sent server:' + this.position());
      network.send({ 
        position: this.position(),
      });
      // network.send({ 
        // direction: this.diretion,
      // });
    },
    
    
  });
  
  return NetworkPlayer;
});
