define([
  'core/component',
  'subsystems/input'
  ], function(Component, Input) {
  var InputComponent = Component.extend({
    init: function(input) {
      this.Component('input');
      this.InputComponent();
    },
    
    // InputComponent constructor
    InputComponent: function() {
      Input.add(this);
    },
    
    recived: function(input, t, dt) {
    }
  });
  
  return InputComponent;
});
