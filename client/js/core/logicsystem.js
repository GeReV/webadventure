define([ 
  'core/core',
  'core/system'
  ], function(Core, System) {
  var LogicSystem = System.extend({
    init: function() { },
    
    // LogicSystem constructor
    LogicSystem : function(type) {
      this.System(type);
      Core._logicAdd(this);
    },
  });
  
  return LogicSystem;
});
