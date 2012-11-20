define([
  'subsystems/keyboardhandler', 
  'entities/character', 
  'core/sprite', 
  'core/vector', 
  'core/state'
  ], function(Keyboardhandler, Character, Sprite, Vector, State) {
  var Player = Character.extend({
    init: function(game, sprite, x, y, isAlive) {
      this.game = game;
      this.sprite = sprite;
      
      this.width = sprite.width;
      this.height = sprite.height;
      
      this.direction = new Vector(0,0);
      
      this.state = this.previousState = new State({
        x: State.lerp(+x || 0),
        y: State.lerp(+y || 0),
        speed: State.snap(160)
      });
      
      // character
      this.isAlive = isAlive;
      
      // player
      this.keyBind = {up: 'w', down: 's', left: 'a', right: 'd'}
      this.keyboardhandler = new Keyboardhandler([
        this.keyBind.up,
        this.keyBind.down,
        this.keyBind.left,
        this.keyBind.right
      ]); 
      
    },
    
    update: function(physics, t, dt) {
      var inputs = this.keyboardhandler.update();
      
      this.previousState = this.state.clone();
      
      this.direction.zero();
            
      if(inputs.keys[this.keyBind.up])
        this.direction.y = -1;
      if(inputs.keys[this.keyBind.down])
        this.direction.y = 1;
        
      if(inputs.keys[this.keyBind.right])
        this.direction.x = 1;
      if(inputs.keys[this.keyBind.left])
        this.direction.x = -1; 
      
      if(inputs.touch) {
        this.direction.x = inputs.touchPosition[0] - this.x;
        this.direction.y = inputs.touchPosition[1] - this.y;
      }
      
      this.direction.normalize();
      
      this.translate(physics, dt);
    },
    
    draw: function(renderer, state) {
      var offset = renderer.viewport.offset();
      
      renderer.viewport.center(state.x + this.width / 2, state.y + this.height / 2);
      
      renderer.render(this.sprite, state.x, state.y);
    },
    
    translate: function(physics, dt) {
      var deltaX = this.state.speed * this.direction.x * dt,
          deltaY = this.state.speed * this.direction.y * dt;
      
      this.move(deltaX, deltaY);
      
      if(!physics.canMoveTo(this)) {
        this.move(-deltaX, -deltaY);
      }
    }
  });
  
  return Player;
});
