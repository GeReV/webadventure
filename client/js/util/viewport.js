define(function() {
  var Viewport = Class.extend({
    init: function(width, height, bottomBoundary, rightBoundary) {
      this.x = 0;
      this.y = 0;
      this.width = +width || 0;
      this.height = +height || 0;
      
      this.bottomBoundary = +bottomBoundary || this.height;
      this.rightBoundary  = +rightBoundary  || this.width;
    },
    offset: function(x, y) {
      if (!arguments.length) {
        return [this.x, this.y];
      }
      
      return this.setX(x)
        .setY(y);
    },
    center: function(x, y) {
      return this.offset(x - this.width / 2, y - this.height / 2);
    },
    setX: function(x) {
      this.x = +x || 0;
      this.x = Math.min(Math.max(this.x, 0), this.rightBoundary - this.width);
      
      return this;
    },
    setY: function(y) {
      this.y = +y || 0;
      this.y = Math.min(Math.max(this.y, 0), this.bottomBoundary - this.height);
      
      return this;
    },
    rect: function() {
      return [this.x, this.y, this.width + this.x, this.height + this.y];
    }
  });
  
  return Viewport;
});
