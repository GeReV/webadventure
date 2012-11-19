define(function() {
  var State = Class.extend({
    
    init: function(values, unsafe) {
      
      this.keys = Object.keys(values);
      this.unsafe = unsafe;
      
      for (var i=0, l=this.keys.length; i<l; i++) {
        var key = this.keys[i];
        
        if (!this.hasOwnProperty(key) || unsafe) {
          this[key] = values[key];
        } else {
          console && console.warn('State :: Key "' + key + '" already exists on this state object. Might be an inherent property.')
        }
      }
    },
    
    interpolate: function(state, alpha) {
      var result = this.clone();
      
      for (var i=0, l=this.keys.length; i<l; i++) {
        var key = this.keys[i];
        
        if (state.hasOwnProperty( key )) {
          result[key] = this._lerp( this[key], state[key], alpha);
        }
      }
      
      return result;
    },
    
    clone: function() {
      var hash = {};
          
      for (var i=0, l=this.keys.length; i<l; i++) {
        var key = this.keys[i];
        
        hash[key] = this[key];
      }
          
      return new State(hash, this.unsafe);
    },
    
    _lerp: function(a, b, value) {
      return a + (b - a) * value;
    }
  });
  
  return State;
});
