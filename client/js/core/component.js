define([], function() {
  var Component = Class.extend({
    init: function(type) {
      this.Component(type);
    },
    
    // Component constructor
    Component: function(type) {
      this.type = type;
    },
  });
  
  return Component;
});
