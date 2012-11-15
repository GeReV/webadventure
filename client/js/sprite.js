define(function() {
  var Sprite = Class.extend({
    init: function(img, x, y, width, height, opacity) {
      this.img = img;
      this.x = +x || 0;
      this.y = +y || 0;
      this.width = +width || 0;
      this.height = +height || 0;
      this.opacity = +opacity || 1;
    },
    
    position: function(x, y) {
      if (arguments.length <= 0) {
        return [x, y];
      }
      
      x && (this.x = x);
      y && (this.y = y);
      
      return this;
    },
    
    opacity: function(opacity) {
      this.opacity = opacity;
      
      return this;
    },
    
    invisible: function() {
      this.opacity = 0;
      
      return this;
    },
    
    isVisible: function() {
      return this.opacity <= 0;
    },
  });
  
  return Sprite;
});
