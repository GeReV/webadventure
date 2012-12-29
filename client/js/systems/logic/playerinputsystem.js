define([
  'vendor/keyboard', 
  'core/logicsystem'
  ], function(KeyboardState, LogicSystem) {
  var PlayerInputSystem = LogicSystem.extend({
    init: function() {
      this.LogicSystem('PlayerInput');
      this.PlayerInputSystem();
    },
    
    // PlayerInputSystem constructor
    PlayerInputSystem: function() {
      this.keyboardState = new KeyboardState();
    },
    
    component: function(keyBinds) {
      return {keyBinds: keyBinds || {up: 'Up', down: 'Down', left: 'Left', right: 'Right'}};
    },
    
    proccess: function() {
      for (var i = 0, entity; entity = this.entity[i]; i++) {
        var diretionComp = entity.get('Diretion'),
            direction = diretionComp.diretion;
            keyBinds = entity.get('keyBinds');
         
        if(this.keyboardState.pressed(keyBinds.up))
          diretion.y = -1;
        
        if(this.keyboardState.pressed(keyBinds.down))
          direction.y = 1;
          
        if(this.keyboardState.pressed(keyBinds.left))
          direction.x = -1;
          
        if(this.keyboardState.pressed(keyBinds.left))
          direction.x = 1;
          
        diretionComp.diretion = direction.normilize();
      };
    },
  });
  
  new PlayerInputSystem;
});
