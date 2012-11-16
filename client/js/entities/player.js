define(['subsystems/keyboardhandler', 'entities/character', 'core/sprite', 'core/vector'], function(Keyboardhandler, Character, Sprite, Vector) {
  var Player = Character.extend({
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
