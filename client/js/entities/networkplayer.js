define(['subsystems/keyboardhandler', 'entities/character', 'core/sprite', 'core/vector'], function(Keyboardhandler, Character, Sprite, Vector) {
  var NetworkPlayer = Player.extend({
    init: function(sprite, x, y, isAlive) {
      this.sprite = sprite;
      this.x = +x || 0;
      this.y = +y || 0;
      this.width = sprite.width;
      this.height = sprite.height;
      this.direction = new Vector(0,0);
      this.speed = new Vector(5,5);
      
      // chareacter
      this.isAlive = isAlive;
      
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
      this.nextPosition = new vector;
      this.timeStamp = 0;
      this.nextTimeStamp = 0;
      this.direction = new vector;
      this.nextDirection = new vector;
      
    },
    
    networkUpdate: function(network) {
      var networkData = network.getData(); 
      this.nextTimeStamp = networkData.timeStamp;
      
      // make sure server authorithed that movement
      if(this.lastPosition != networkData.position)
        this.position = networkData.position;  
      
      this.lastPosition = this.position;
      network.publish({id: this.userID, direction: this.diretion, timeStamp: window.perfNow()});
    },
    
    
  });
  
  return NetworkPlayer;
});
