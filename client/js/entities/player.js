define([
  'subsystems/keyboardhandler', 
  'entities/character', 
  'core/sprite', 
  'core/vector', 
  'core/state'
  ], function(Keyboardhandler, Character, Sprite, Vector, State) {
  var Player = Character.extend({
    init: function(game, sprite, x, y, width, height, isAlive) {
      
      this._super(game, sprite, x, y, width, height, isAlive);
      
      this.state.speed = this.previousState.speed = 100;
      
      this.sprite.setAnimation('stand');
      
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
        
      if(inputs.keys[this.keyBind.right]) {
        this.direction.x = 1;
        this.sprite.setAnimation('walkright');
      }
      if(inputs.keys[this.keyBind.left]) {
        this.direction.x = -1;
        this.sprite.setAnimation('walkleft'); 
      }
      
      if(inputs.keys[this.keyBind.up]) {
        this.direction.y = -1;
        
        this.sprite.setAnimation('walkback');
      }
      if(inputs.keys[this.keyBind.down]) {
        this.direction.y = 1;
        this.sprite.setAnimation('walk');
      }
      
      if (this.direction.isZero()) {
        this.sprite.setAnimation('stand');
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
