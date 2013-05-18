define([
  'core/sprite', 
  'subsystems/resourcemanager'
  ], function(Sprite, ResourceManager) {
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
      
      this._initSprites(['grass.png', 'rock.png']);
      this._initMap();
    },
    update: function() {
      
    },
    render: function(renderer) {
      var sprite,
          tileW = this.tileWidth,
          tileH = this.tileHeight,
          viewport = renderer.viewport.rect(),
          tlTile = this.gridPositionFromXY(viewport[0], viewport[1]),
          brTile = this.gridPositionFromXY(viewport[2], viewport[3]);
      
      for (var i = tlTile[0], l1 = brTile[0]; i<=l1; i++) {
        for (var j = tlTile[1], l2 = brTile[1]; j<=l2; j++) {
          sprite = this.sprites[ this.map[i][j] ];
          
          sprite && renderer.render( sprite, i * tileW, j * tileH );
        }
      }
    },
    _initSprites: function(images) {
      var images = ResourceManager.get(images);
      
      for (var i=0, l=images.length; i<l; i++) {
        var image = images[i];
        
        this.sprites.push(new Sprite(image, null));
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
    },
    
    isPassableByXY: function(x, y) {
      var gridLocation = this.gridPositionFromXY(x, y);
      
      return this.isPassable(gridLocation[0], gridLocation[1]);
    }
  });
  
  return TileMap;
});