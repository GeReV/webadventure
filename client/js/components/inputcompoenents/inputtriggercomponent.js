define(['components/inputcomponent'], function(InputComponent) {
  var InputTriggerComponent = InputComponent.extend({
    init: function(triggerComponent, triggerFunc) {
      this.InputComponent();
      this.InputTriggerComponent(triggerComponent, triggerFunc);
      this.Component('inputtrigger');
    },
    
    // PlayerInputTriggerComponent constructor
    InputTriggerComponent: function(triggerComponent, triggerFunc) {
      this.triggerComponent = triggerComponent;
      this.triggerFunc = triggerFunc;
    },
    
    recived: function(input, t, dt) {
      if(this.triggerFunc(input))
        this.triggerComponent.trigger(t, dt);
    }
  });
  
  return InputTriggerComponent;
});
