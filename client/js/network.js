define(function() {
  var Network = Class.extend({
    init: function(host, port) {
      this.url = "ws://"+ this.host +":"+ this.port +"/",
      this.callbacks = [];
    },
    connect: function() {
      var socket = io.connect(this.url);
      
      socket.on('update', this.publish);
    },
    publish: function(data) {
      var json = JSON.parse(data);
      
      for (var i=0, l=this.callbacks.length; i < l; i++) {
        this.callbacks[i](json);
      }
    },
    subscribe: function(callback) {
      this.callbacks.push(callback);
    },
    unsubscribe: function(callback) {
      for (var i=0, l=this.callbacks.length; i < l; i++) {
        if (this.callbacks[i] === callback) {
          this.callbacks.splice(i, 1);
        }
      }
    }
  });
  
  return Network;
});
