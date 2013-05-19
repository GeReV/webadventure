define(function() {
  var Vector = Class.extend({
    init: function(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    },
    
    length: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    
    normalize: function() {
      var length = this.length();
   
      if(length != 0) {
        this.x = this.x / length;
        this.y = this.y / length;
      }
   
      return this;
    },
    
    zero: function() {
      this.x = this.y = 0;
      
      return this;
    },
    
    isZero: function() {
      return this.x === 0 && this.y === 0;
    }
  });
  
  return Vector;
});
