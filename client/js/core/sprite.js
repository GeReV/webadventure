// TODO: change the array to vector
define([
    'core/animation'
  ], function(Animation) {
  
  var Sprite = Class.extend({
    init: function(img, frames, opacity) {
      this.img = img;
      this.frames = frames;
      this.opacity = +opacity || 1;
      
      this.animations = frames && Animation.buildAnimations(this.frames);
      this.currentAnimation = null;
    },
    
    update: function(physics, t, dt) {
      this.currentAnimation && this.currentAnimation.update(physics, t, dt);
    },
    
    setAnimation: function(animation) {
      this.currentAnimation = this.animations[animation];
    },
    
    getFrame: function() {
      if (this.currentAnimation) {
        return this.currentAnimation.getFrame();
      }
      
      return [0, 0, this.img.width, this.img.height];
    },
    
    opacity: function(opacity) {
      this.opacity = opacity;
      
      return this;
    },
  });
  
  return Sprite;
});
