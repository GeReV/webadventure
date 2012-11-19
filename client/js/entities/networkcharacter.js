define(['subsystems/keyboardhandler', 'entities/character', 'core/sprite', 'core/vector'], function(Keyboardhandler, Character, Sprite, Vector) {
  var NetworkCharacter = Character.extend({
    init: function(game, sprite, x, y, isAlive, id ) {
      this.game = game;
      this.sprite = sprite;
      
      this.width = sprite.width;
      this.height = sprite.height;
      
      this.direction = new Vector(0,0);
      this.speed = new Vector(5,5);
      
      this.state = this.previousState = new State({
        x: +x || 0,
        y: +y || 0
      });
      
      // chareacter
      this.isAlive = isAlive;
      
      //network character     
      this.userId = id || '';
      this.nextPosition = new Vector;
      this.timeStamp = 0;
      this.nextTimeStamp = 0;
      this.direction = new Vector;
      this.nextDirection = new Vector;
    },
    
    networkUpdate: function(network) {
      /*this.nextPosition = networkData.position;
      this.nextTimeStamp = networkData.timeStamp;
      this.nextDirection = networkData.direction;*/
    },
    
    update: function(physics, t, dt) {
      // interpolate
      var delataT = this.nextTimeStamp - this.timeStamp, 
          deltaX = this.nextPosition.x - this.state.x,
          deltaY = this.nextPosition.y - this.state.y,
          interpolation = 0.1 * delataT;
    
      this.timeStamp = this.nextTimeStamp;
      this.state.x += deltaX * interpolation;
      this.state.y += deltaY * interpolation;      
    },
    
    translate: function(physics, dt) {
      // TODO: predict next position
    }
  });
  
  return NetworkCharacter ;
});
