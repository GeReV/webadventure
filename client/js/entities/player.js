define([
  'subsystems/keyboardhandler', 
  'entities/character', 
  'core/sprite', 
  'core/vector', 
  'core/state'
  ], function(Keyboardhandler, Character, Sprite, Vector, State) {
  var Player = Character.extend({
    init: function(game, sprite, x, y, width, height, isAlive) {
      this.game = game;
      
      this.sprite = sprite;
      this.sprite.setAnimation('stand');
      
      this.width = +width || 0;
      this.height = +height || 0;
      
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
      
      this.sprite.setAnimation('stand');
            
      if(inputs.keys[this.keyBind.up]) {
        this.direction.y = -1;
        this.sprite.setAnimation('walkback');
      }
      if(inputs.keys[this.keyBind.down]) {
        this.direction.y = 1;
        this.sprite.setAnimation('walk');
      }
        
      if(inputs.keys[this.keyBind.right]) {
        this.direction.x = 1;
        this.sprite.setAnimation('walkright');
      }
      if(inputs.keys[this.keyBind.left]) {
        this.direction.x = -1;
        this.sprite.setAnimation('walkleft'); 
      }
      
      if(inputs.touch) {
        this.direction.x = inputs.touchPosition[0] - this.x;
        this.direction.y = inputs.touchPosition[1] - this.y;
      }
      
      this.sprite.update(physics, t, dt);
      
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
