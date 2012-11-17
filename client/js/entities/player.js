define(['subsystems/keyboardhandler', 'entities/character', 'core/sprite', 'core/vector'], function(Keyboardhandler, Character, Sprite, Vector) {
  var Player = Character.extend({
    init: function(game, sprite, x, y, isAlive) {
      this.game = game;
      this.sprite = sprite;
      this.width = sprite.width;
      this.height = sprite.height;
      this.direction = new Vector(0,0);
      this.speed = new Vector(5,5);
      
      this.position(0, 0);
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
      
    },
    
    update: function() {
      var inputs = this.keyboardhandler.update();
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
    },
    
    render: function(renderer) {
      var offset = renderer.viewport.offset();
      
      renderer.viewport.center(this.x + this.width / 2, this.y + this.height / 2);
      
      renderer.render(this.sprite, this.x, this.y);
    },
    
    translate: function(physics) {
      var deltaX = this.speed.x * this.direction.x,
          deltaY = this.speed.y * this.direction.y;
      
      this.move(deltaX, deltaY);
      
      if(!physics.canMoveTo(this)) {
        this.move(-deltaX, -deltaY);
      }
    }
  });
  
  return Player;
});
