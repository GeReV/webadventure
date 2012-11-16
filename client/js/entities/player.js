define(['subsystems/keyboardhandler', 'entities/character', 'core/sprite', 'core/vector'], function(Keyboardhandler, Character, Sprite, Vector) {
  var Player = Character.extend({
    init: function(sprite, x, y, isAlive) {
      this.sprite = sprite;
      this.x = +x || 0;
      this.y = +y || 0;
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
      if(inputs.keys[this.keyBind.up])
        this.direction.y = 1;
      if(inputs.keys[this.keyBind.down])
        this.direction.y = -1;
        
      if(inputs.keys[this.keyBind.right])
        this.direction.y = 1;
      if(inputs.keys[this.keyBind.left])
        this.direction.y = -1; 
        
      this.direction.normalize();
    },
    
    render: function(renderer) {
      renderer.fillRect(0, 0, 10, 10);
    },
    
    translate: function(physics) {
      if(!physics.tileMap.tilePassable(this.x, this.y));
    }
  });
  
  return Player;
});
