define([
  'vendor/keyboard', 
  'game'
  ], function(KeyboardState, Game) {
  var KeyboardHandler = Class.extend({
    init: function(keys) {
      this.keyboard = new KeyboardState;
      this.keys = keys;
      this.sequence = 0;
    },
    
    update: function() {
      var input = [];
      
      for (var i=0, l=this.keys.length; i < l; i++) {
        if (this.keyboard.pressed(this.keys[i])) {
          input.push(this.keys[i]);
          input[this.keys[i]] = true;
        }
      }
      
      var inputs = this.inputs = {
        keys: input,
        time: 000000,//Game.getTime(),
        sequence: ++this.sequence
      };
      
      inputs.touch = this.keyboard.touch;
      inputs.touchPosition = this.keyboard.touchPosition; 
      
      return inputs;
    },
    
    serialize: function() {
      //Send the packet of information to the server.
      //The input packets are labelled with an 'i' in front.
      return 'i.' +
          this.inputs.keys.join('-') + '.' +
          this.inputs.time.toFixed(3).replace('.','-') + '.' +
          this.inputs.sequence;
    }
  });
  
  return KeyboardHandler;
});
