define([
  'core/core',
  'core/component', 
  ], function(Core, Component) {
  var System = Class.extend({
    init: function() {
    },
    
    // System constructor
    // notice: Type in camelcase
    System: function(type) {
      this.core = Core;
      this.type = type;
      this.components = [];
    },
    
    // overides to construct system specific component
    constructComponent: function() {},
    
    create: function() {
      var component = this.constructComponent.apply(this, args);
      this.components.push(component);
    },
    
    proccess: function(t, dt) { },
  });
  
  return System;
});
