define([
  'vendor/keyboard'
  ], function(KeyboardState) {
  var Input = Class.extend({
    init: function() {
      this.components = [];
      this.keyboard = new KeyboardState;
    },
    
    add: function(component) {
      var array;
      if(array = this[component.type]) {
        array.push(component);
        return;
      }
      
      this[component.type] = [component];
    },
    
    recive: function(t, dt) {
      for(var i = 0, component; component = this.components[i]; i++) {
        component.recived(this, t, dt);
      };
    },
  });
  
  return new Input(); // TODO: lame singleton. change later
});