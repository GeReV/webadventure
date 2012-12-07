define(['core/entity'], function() {
  var Physics = Class.extend({
    init: function() {
      this.components = [];
    },
    
    add: function(component) {
      var array;
      
      this.components.push(component);
      
      if(array = this[component.type]) {
        array.push(component);
        return; 
      }
      
      this[component.type] = [component];
    },
    
    update: function(t, dt) {
      // use subtree to fasten the algorithem according to their speeds and such
      for(var i = 0, component; component = this.components[i]; i++) {
        component.update(this, t, dt);
      }; 
    },
  });
  
  return new Physics(); // TODO: lame singleton. change later
});