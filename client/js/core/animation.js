define(function() {
  var Animation = Class.extend({
    init: function(frames, fps, reverseAnimation, firstFrame, loopCount) {
      this.frames = frames;
      this.fps = +fps || 1;
      this.loopCount = +loopCount || Infinity;
      
      this.animationStep = (reverseAnimation ? -1 : 1);
      
      this.currentFrame = +firstFrame || 0;
      this.accumulator = 0;
      this.frameDuration = 1 / this.fps;
    },
    
    update: function(physics, t, dt) {
      var nextFrame;
      
      if (this.frames.length > 0 && this.frameDuration > 0 && this.isLooping()) {
        this.accumulator += dt;
        
        nextFrame = this.getFrameIndex() + Math.floor(this.accumulator / this.frameDuration) * this.animationStep;
        
        if (nextFrame < 0) {
          nextFrame = this.frames.length - 1;
          
          this.finishedLoop();
        }
        
        if (nextFrame >= this.frames.length) {
          nextFrame = nextFrame % this.frames.length;
          
          this.finishedLoop();
        }
        
        this.setFrameIndex(nextFrame);
        
        this.accumulator -= Math.floor(this.accumulator / this.frameDuration) * this.frameDuration;
      }
    },
    
    getFrame: function() {
      return this.frames[this.currentFrame];
    },
    
    getFrameIndex: function() {
      return this.currentFrame;
    },
    
    setFrameIndex: function(frame) {
      this.currentFrame = frame % this.frames.length;
    },
    
    reset: function() {
      this.setFrameIndex(0);
    },
    
    isLooping: function() {
      return this.loopCount > 0;
    },
    
    finishedLoop: function() {
      if (this.isLooping()) {
      	this.loopCount--;
      }
    }
  });
  
  Animation.buildAnimations = function(frames) {
    
  };
  
  return Animation;
});
