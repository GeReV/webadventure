define([
  'core/core',
  ], function(Core) {
  var Entity = Class.extend({
    init: function(type) {
      this.Assemblage(type);
    },
    
    // entity constructor
    Entity: function() {
      this._systems = Core._systems;
      this._components = [];
    },
    
    add: function(type) {
      this._systems[type]._addEntity(this, arguments.slice(1, arguments.length));
      
      return this;
    },
    
    get: function(type) {
      var comp = this._components[type]; 
      
      if(!comp)
        throw 'undefined Compononet: ' + type;
      
      return comp;
    },
    
    remove: function(type) {
      this._systems[type]._removeEntity(this);
      
      return this;
    },
  });
  
  return Entity;
});
