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
    
    // keyBinds = {up: 'w', down: 's', left: 'a', right: 'd'};
    constructComponent: function(directionComponent, keyBinds) {
      return {directionComponent: directionComponent, keyBinds: keyBinds};
    },
    
    proccess: function(t, dt) {
      for (var i = 0, component; component = this.components[i]; i++) {
        var diretion = component.directionComponent.diretion,
            keyBinds = component.keyBinds;
         
        if(this.keyboardState.pressed(keyBinds.up))
          diretion.y = -1;
        
        if(this.keyboardState.pressed(keyBinds.down))
          direction.y = 1;
          
        if(this.keyboardState.pressed(keyBinds.left))
          direction.x = -1;
          
        if(this.keyboardState.pressed(keyBinds.left))
          direction.x = 1;
          
        component.directionComponent.diretion = direction.normilize();
      };
    },
  });
  
  new PlayerInputSystem;
});
