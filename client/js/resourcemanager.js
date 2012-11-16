define(function() {
  var ResourceManager = Class.extend({
    init: function(resources, callback) {
      var that = this;
      
      this.resources = {};
      
      this._load(resources, callback);
    },
    _getName: function(resource) {
      return resource.slice(resource.lastIndexOf('/') + 1);
    },
    _load: function(resource, callback) {
      var that = this;
      
      if (resource.length) {
        for (var i=0, l=resource.length; i<l; i++) {
          resource[i] = 'image!' + resource[i];
        }
      }else{
        resource = 'image!' + resource;
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
    get: function(name) {
      return this.resources[name];
    }
  });
  
  var resourcemanager = new ResourceManager;
  
  return resourcemanager;
});
