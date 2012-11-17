define(function() {
  var ResourceManager = Class.extend({
    init: function(resources, callback) {
      var that = this;
      
      this.resources = {};
      
      if (resources) {
        this._load(resources, callback);
      }
    },
    _getName: function(resource) {
      return resource.slice(resource.lastIndexOf('/') + 1);
    },
    _load: function(resource, callback) {
      var that = this;
      
      resource = [].concat(resource);
      
      for (var i=0, l=resource.length; i<l; i++) {
        resource[i] = 'image!' + resource[i];
      }
      
      require(resource, function() {
        for (var i=0, l=arguments.length; i<l; i++) {
          var image = arguments[i];
          that.resources[ that._getName(image.src) ] = image;
        }
        
        if (callback) {
          callback.apply(this, arguments);
        }
      });
    },
    add: function(resource, callback) {
      this._load(resource, callback);
    },
    get: function(resource) {
      var images = [];
      
      resource = [].concat(resource);
      
      for (var i=0, l=resource.length; i<l; i++) {
        images[i] = this.resources[ resource[i] ];
      }
      
      return images.length <= 1 ? images[0] : images;
    }
  });
  
  var resourcemanager = new ResourceManager;
  
  return resourcemanager;
});
