define(['core/sprite', 'subsystems/resourcemanager'], function(Sprite, ResourceManager) {
  var TileMap = Class.extend({
    init: function(width, height) {
      var that = this;
      
      //this.sprites = [];
      this.map = [];
      this.sprites = [];
      this.collisionMap = [];
      
      this.tileWidth = 40;
      this.tileHeight = 40;
      
      this.width = +width || 18;
      this.height = +height || 15;
      
      this._initMap();
      
      ResourceManager.add(['img/grass.png', 'img/rock.png'], function() {
        for (var i=0, l=arguments.length; i<l; i++) {
          var image = arguments[i];
          
          that.sprites.push(new Sprite(image, 0, 0, this.tileWidth, this.tileHeight));
        }
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
    },
    _initMap: function() {
      for (var i=0; i<=this.width; i++) {
        this.map[i] = [];
        for (var j=0; j<=this.height; j++) {
          this.map[i][j] = ((Math.random() * 3 >= 2) ? 1 : 0);
        }
      }
      
      for (var i=0; i<=this.width; i++) {
        this.collisionMap[i] = [];
        for (var j=0; j<=this.height; j++) {
          this.collisionMap[i][j] = 0;
        }
      }
    },
    
    gridPositionFromXY: function(x, y) {
      return [Math.floor(x / this.tileWidth), Math.floor(y / this.tileHeight)];
    },
    
    isPassable: function(gridX, gridY) {
      return this.collisionMap[gridX][gridY] == 0;
    }
  });
  
  return TileMap;
});