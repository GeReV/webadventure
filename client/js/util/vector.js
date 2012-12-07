define(function() {
  var Vector = Class.extend({
    init: function(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    },
        
    zero: function() {
      this.x = this.y = 0;
      
      return this;
    },
    
    clone: function() {
      return new Vector(this.x, this.y);
    },

    add: function(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    },

    subtract: function(vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    },

    multiply: function(scalar) {
      return new Vector(this.x * scalar, this.y * scalar);
    },

    length: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    dot: function(vector) {
      return this.x * vector.x + this.y * vector.y;
    },

    findNormal: function(prevVector, nextVector) {
      var vec1 = prevVector.subtract(this).normalize(), vec2 = nextVector.subtract(this).normalize(), direction = vec1.windingOrder(vec2), normal = vec1.add(vec2);
  
      if(normal.length() <= 0) {
        normal = new Vector2D(vec1.y, -vec1.x);
        // Rotate -90 degrees from the previous.
      }
  
      return normal.normalize().multiply(direction);
    },

    directionToPoint: function(point) {
      return new Vector(point.x - this.x, point.y - this.y).normalize();
    },
  
    normalize: function() {
      return this.multiply(1 / this.length());
    },

    windingOrder: function(vector) {
      var z = vector.x * this.y - vector.y * this.x;
      return (z / Math.abs(z)) || 1;
    },

    lerp: function(vector, amount) {
      if(amount < 0 || amount > 1) {
        return null;
      }
      return new Vector(this.x + (vector.x - this.x) * amount, this.y + (vector.y - this.y) * amount);
    },

    distanceToPoint: function(vector) {
      return Math.sqrt( Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2) );
    },

    distanceToLine: function(a, b) {
      var normal = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
      return Math.abs((this.x - a.x) * (b.y - a.y) - (this.y - a.y) * (b.x - a.x)) / normal;
    },

    equals: function(vector) {
      return vector ? vector.x == this.x && vector.y == this.y : false;
    }
  });
  
  return Vector;
});
