define(function() {
  var State = Class.extend({
    
    init: function(values, unsafe) {
      
      this.interpolators = {};
      this.keys = Object.keys(values);
      this.unsafe = unsafe;
      
      for (var i=0, l=this.keys.length; i<l; i++) {
        var key = this.keys[i],
            interpolator = values[key];
        
        if (!this.hasOwnProperty(key) || unsafe) {
          this[key] = (interpolator.value || interpolator.initial); // Value overrides initial, used when cloning.
          this.interpolators[key] = interpolator;
        } else {
          console && console.warn('State :: Key "' + key + '" already exists on this state object. Might be an inherent property.')
        }
      }
    },
    
    interpolate: function(state, alpha) {
      var result = this.clone();
      
      for (var i=0, l=this.keys.length; i<l; i++) {
        var key = this.keys[i],
            interpolator = this.interpolators[key];
        
        if (state.hasOwnProperty( key )) {
          result[key] = interpolator( this[key], state[key], alpha);
        }
      }
      
      return result;
    },
    
    clone: function() {
      var hash = {};
          
      for (var i=0, l=this.keys.length; i<l; i++) {
        var key = this.keys[i];
        
        hash[key] = this.interpolators[key];
        hash[key].value = this[key];
      }
          
      return new State(hash, this.unsafe);
    }
  });
  
  // Interpolates linearly between the previous and new value.
  State.lerp = function(initial) {
    var fn = function(a, b, value) {
      return a + (b - a) * value;
    };
    
    fn.initial = initial;
    
    return fn;
  };
  
  // Sets the value to the new value.
  State.snap = function(initial) {
    var fn = function(a, b, value) {
      return b;
    };
    
    fn.initial = initial;
    
    return fn;
  };
  
  // TODO: Add support for vectors.
  
  return State;
});
