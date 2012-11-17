// TODO: change the array to vector
define(function() {
  var Sprite = Class.extend({
    init: function(img, width, height, opacity) {
      this.img = img;
      this.width = +width || img.width || 0;
      this.height = +height || img.height || 0;
      this.opacity = +opacity || 1;
    },
    
    opacity: function(opacity) {
      this.opacity = opacity;
      
      return this;
    },
  });
  
  return Sprite;
});
