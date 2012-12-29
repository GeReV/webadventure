// TODO: make it universal resource loader, make it able to handle variety of resources including audio, data, clips ...
define(function() {
  var ResourceManager = Class.extend({
    init: function(resources, callback) {
      var that = this;
      
      this.resources = {};
      this.loadingCount = 0;
      
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
        
        this.loadingCount--;
        
        if(this.loadingCount == 0) {
          this.trigger('loading:finish');
        }
        
        if (callback) {
          callback.apply(this, arguments);
        }
      });
    },
    add: function(resource, callback) {
      this.loadingCount++;
      this._load(resource, callback);
    },
    get: function(resource) {
      var images = [];
      
      resource = [].concat(resource);
      
      for (var i=0, l=resource.length; i<l; i++) {
        images[i] = this.resources[ resource[i] ];
      }
      
      return images.length <= 1 ? images[0] : images;
    },
    onFinish: function(callback, context) {      
      this.on('loading:finish', callback, context);
      
      if(this.loadingCount == 0) {
        this.trigger('loading:finish');
      }
    }
  });
  
  var resourcemanager = new ResourceManager;
  
  return new resourcemanager;
});
