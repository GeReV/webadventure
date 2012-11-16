define(['core/sprite', 'subsystems/resourcemanager'], function(Sprite, ResourceManager) {
  var TileMap = Class.extend({
    init: function() {
      var that = this;
      
      //this.sprites = [];
      this.map = [[0, 0, 0, 0, 0 ,0],[0, 0, 0, 0, 0 ,0],[0, 0, 0, 0, 0 ,0]];
      this.sprites = [];
      
      this.tileWidth = 32;
      this.tileHeight = 32;
      
      ResourceManager.add('img/grass.png', function(image) {
        that.sprites.push(new Sprite(image, 0, 0, 32, 32));
      });
    },
    update: function() {
      
    },
    render: function(renderer) {
      var sprite,
          tileW = this.tileWidth,
          tileH = this.tileHeight;
      
      for (var i=0, l1=this.map.length; i<l1; i++) {
        for (var j=0, l2=this.map[i].length; j<l2; j++) {
          sprite = this.sprites[ this.map[i][j] ];
          
          sprite && renderer.render( sprite, i * tileW, j * tileH );
        }
      }
    }
  });
  
  return TileMap;
});