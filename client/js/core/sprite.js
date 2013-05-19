// TODO: change the array to vector
define([
    'core/animationmanager'
  ], function(AnimationManager) {
  
  var Sprite = Class.extend({
    init: function(img, frames, opacity) {
      this.img = img;
      this.frames = frames;
      this.opacity = +opacity || 1;
      
      this.animationManager = new AnimationManager(this.frames);
    },
    
    update: function(physics, t, dt) {
      this.animationManager.update(physics, t, dt);
    },
    
    setAnimation: function(animation) {
      this.animationManager.setAnimation(animation);
    },
    
    whichAnimation: function() {
      return this.animationManager.whichAnimation();
    },
    
    getFrame: function() {
      return this.animationManager.getFrame() || [0, 0, this.img.width, this.img.height];
    },
    
    opacity: function(opacity) {
      this.opacity = opacity;
      
      return this;
    },
  });
  
  return Sprite;
});
