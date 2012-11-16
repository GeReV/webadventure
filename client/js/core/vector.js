define(function() {
  var Vector = Class.extend({
    init: function(x, y) {
      this.x = x;
      this.y = y;
    },
    
    length: function() {
      return Math.sqrt(this.x * this.x * + this.y * this.y)
    },
    
    normalize: function() {
      var length = this.length();
   
      if(length != 0){
          this.X = X/length;
          this.Y = Y/length;
      }
   
      return this;
    }
  });
  
  return Vector;
});
