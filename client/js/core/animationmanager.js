define([
    'core/animation'
  ], function(Animation) {
    var defaultFps = 10;
    
    var AnimationManager = Class.extend({
      
      init: function(animations) {
        if (!frames) {
          return;
        }
        
        this.animations = {};
        this.currentAnimation = null;
        this.currentAnimationKey = null;
    
        for (key in animations) {
          var animation = animations[key],
              fps = animation.fps || defaultFps,
              reverse = animation.reverseAnimation,
              firstFrame = animation.firstFrame,
              loopCount = animation.loopCount;
          
          this.animations[key] = new Animation(animation.frames || animation, fps, reverse, firstFrame, loopCount);
          
        }
      },
      
      update: function(physics, t, dt) {
        this.currentAnimation && this.currentAnimation.update(physics, t, dt);
      },
      
      setAnimation: function(animation) {
        if (this.currentAnimationKey === animation) {
          return;
        }
        
        this.currentAnimationKey = animation;
        this.currentAnimation = this.animations[animation];
        
        // TODO: Should reset animation?
        /*if (this.currentAnimation) {
          this.currentAnimation.reset();
        }*/
      },
      
      whichAnimation: function() {
        return this.currentAnimationKey;
      },
      
      getFrame: function() {
        return this.currentAnimation && this.currentAnimation.getFrame();
      }
    });
    
    return AnimationManager;
});