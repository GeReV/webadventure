define(['components/inputcomponent'], function(InputComponent) {
  var KeyTriggerComponent = InputComponent.extend({
    init: function(triggerComponent, key) {
      this.InputComponent();
      this.KeyTriggerComponent(triggerComponent, triggerFunc);
      this.Component('keytrigger');
    },
    
    // KeyTriggerComponent constructor
    KeyTriggerComponent: function(triggerComponent, key) {
      this.triggerComponent = triggerComponent;
      this.key = key;
    },
    
    recived: function(input, t, dt) {
      if(!input.keyboard.pressed(this.key))
        return true;
        
      this.triggerComponent.trigger(t, dt);
    }
  });
  
  return InputTriggerComponent;
});
