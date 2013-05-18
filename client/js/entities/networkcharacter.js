define([
  'subsystems/keyboardhandler', 
  'entities/character', 
  'core/sprite', 
  'core/vector'
  ], function(Keyboardhandler, Character, Sprite, Vector) {
  var NetworkCharacter = Character.extend({
    init: function(game, sprite, x, y, width, height, isAlive, id ) {
      this.game = game;
      this.sprite = sprite;
      
      this.width = +width || 0;
      this.height = +height || 0;
      
      this.direction = new Vector(0,0);
      
      this.state = this.previousState = new State({
        x: State.lerp(+x || 0),
        y: State.lerp(+y || 0),
        speed: State.snap(8)
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
