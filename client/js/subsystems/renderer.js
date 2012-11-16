define(['core/entity'], function() {
  var Renderer = Class.extend({
    init: function(canvas, viewport) {
      this.height = canvas.height;
      this.width = canvas.width;
      
      this.canvas = canvas; // why dont we have both
      this.ctx = canvas.getContext('2d');
      
      this.viewport = viewport;
    },
    
    render: function(sprite, x, y) {
      var offset = this.viewport.offset();
      
      x = +x || 0;
      y = +y || 0;
      this.ctx.drawImage(sprite.img, x - offset[0], y - offset[1]);
    }, 
    
    fillRect: function(x, y, w, h) {
      //this.ctx.save();
      this.ctx.fillStyle = 'rgb(255,0,0)';
      this.ctx.fillRect(x, y, w, h);
      //this.ctx.restore();
    },
    
    clear: function() {
      //this.ctx.save();
      this.ctx.fillStyle = 'rgb(0,0,0)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      //this.ctx.restore();
    },
  });
  
  return Renderer;
});