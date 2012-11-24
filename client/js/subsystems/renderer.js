define(['core/entity'], function() {
  var Renderer = Class.extend({
    init: function(canvas, viewport) {
      this.components = [];
      
      this.height = canvas.height;
      this.width = canvas.width;
      
      this.canvas = canvas; // why dont we have both
      this.ctx = canvas.getContext('2d');
      
      this.viewport = viewport;
    },
    
    add: function(renderComponent) {
      var array;
      
      this.components.push(component);
      
      if(array = this[component.type]) {
        array.push(component);
        return; 
      }
      
      this[component.type] = [component];
    },
    
    render: function(t, dt) {
      this.clear();
      
      // do culling but watch for transperent objects
      
      // do rearance for better drawing performance
      
      // render each component
      for(var i = 0, component; component = this.components[i]; i++) {
        component.render(this, t, dt);
      };
    },
    
    drawSprite: function(sprite, x, y) {
      var offset = this.viewport.offset();
      
      x = +x || 0;
      y = +y || 0;
      this.ctx.drawImage(sprite.img, x - offset[0], y - offset[1]);
    }, 
    
    fillRect: function(x, y, w, h) {
      var offset = this.viewport.offset();
      //this.ctx.save();
      this.ctx.fillStyle = 'rgb(255,0,0)';
      this.ctx.fillRect(x - offset[0], y - offset[1], w, h);
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