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
    _getExtension: function(resource) {
      return /\.(\w+)$/i.exec(resource)[1];
    },
    _load: function(resources, callback) {
      var that = this,
          loaded = 0;
      
      resources = [].concat(resources);
      
      for (var i=0, l=resources.length; i<l; i++) {
        (function(resourceName) {
          var resource;
          switch (that._getExtension(resourceName)) {
            case 'gif':
            case 'jpg':
            case 'jpeg':
            case 'png':
              resource = 'image!' + resourceName;
              break;
            case 'json':
              resource = 'json!' + resourceName;
              break;
          }
          
          require([resource], function() {
            for (var i=0, l=arguments.length; i<l; i++) {
              var object = arguments[i];
              that.resources[ that._getName(resourceName) ] = object;
              loaded++;
            }
            
            if (callback && loaded === resources.length) {
              callback.apply(that, arguments);
            }
          });
        })(resources[i]);
        
      }
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
