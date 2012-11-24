define(['components/inputcomponent'], function(InputComponent) {
  var InputTriggerComponent = InputComponent.extend({
    init: function(triggerComponent, triggerFunc) {
      this.Component('inputtrigger');
      this.InputComponent();
      this.InputTriggerComponent(triggerComponent, triggerFunc);
    },
    
    // PlayerInputTriggerComponent constructor
    InputTriggerComponent: function(triggerComponent, triggerFunc) {
      this.triggerComponent = triggerComponent;
      this.triggerFunc = triggerFunc;
    },
    
    recived: function(input, t, dt) {
      if(this.triggerFunc(input))
        this.trigger(t, dt);
    }
  });
  
  return InputTriggerComponent;
});
