define([
  'core/core',
  'core/system'
  ], function(Core, System) {
  var OutputSystem = System.extend({
    init: function() { },
    
    // System constructor
    OutputSystem: function(type) {
      this.System(type);
      Core._outputAdd(this);
    },
  });
  
  return OutputSystem;
});
