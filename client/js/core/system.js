define([
  'core/core',
  ], function(Core) {
  var System = Class.extend({
    init: function() {
    },
    
    // System constructor
    // notice: Type in camelcase
    System: function(type) {
      this.core = Core;
      this.type = type;
      this.entities = {};
      this.enabled = false;
      
      this.core.stateChange(function(state, states) {
        this.enabled = false;
        states.run && (this.enabled = true);
      });
    },
    
    component: function() {},
    
    _addEntity: function(entity, args) {
      var comp = this.component.apply(this, args);
      entity.components[this.type] = comp;
      this.entities[entitiy.id] = entitiy;
      
      return comp;
    },
    
    _removeEntity: function() {
      
    },
    
    setState: function(state, active) { // TODO: make it like jQuery arguments ({ paused: true, minimized: true})
      this.core._setState(state, active);
    },
    
    proccess: function(t, dt) { },
  });
  
  return System;
});
