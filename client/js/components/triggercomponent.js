define([
  'core/component',
  ], function(Component) {
  var TriggerComponent = Component.extend({
    init: function(callback, context) {
      this.Component('trigger');
      this.TriggerComponent(callback, context);
    },
    
    // InputComponent constructor
    TriggerComponent: function(callback, context) {
      this.callbacks = [];
      this.bind(callback, context);
    },
    
    trigger: function () {
      for (var i = 0, callback; callback = this.callbacks; i++) {
        callback.func.apply(callback.context, arguments);
      };
    },
    
    bind: function(callback, context) {
      this.callbacks.push({func: callback, context: context});
    }
  });
  
  return TriggerComponent;
});
