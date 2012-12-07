define([
  'core/core',
  'core/component', 
  ], function(Core) {
  var Assemblage = Class.extend({
    init: function(type) {
      this.Template(type);
    },
    
    // System constructor
    // notice: Type in camelcase
    Assemblage: function(type) {
      this.type = type;
      this.core = Core;
    },
  });
  
  return Assemblage;
});
