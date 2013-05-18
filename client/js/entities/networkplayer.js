define([
  'subsystems/keyboardhandler',
  'entities/character', 
  'core/sprite', 
  'core/vector', 
  'core/state', 
  'entities/player'
  ], function(Keyboardhandler, Character, Sprite, Vector, State, Player) {
  var NetworkPlayer = Player.extend({
    init: function(game, sprite, x, y, width, height, isAlive) {
      this._super(game, sprite, x, y, width, height, isAlive);
      
      this.state.speed = this.previousState.speed = 100;
      
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
