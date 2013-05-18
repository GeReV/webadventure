define([
  'subsystems/keyboardhandler', 
  'entities/character', 
  'core/sprite', 
  'core/vector'
  ], function(Keyboardhandler, Character, Sprite, Vector) {
  var NetworkCharacter = Character.extend({
    init: function(game, sprite, x, y, width, height, isAlive, id ) {
      this._super(game, sprite, x, y, width, height, isAlive);
      
      this.state.speed = this.previousState.speed = 8;
      
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
