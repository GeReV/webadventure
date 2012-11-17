define(function() {
  var Network = Class.extend({
    init: function(host, port) {
      this.url = "ws://"+ this.host +":"+ this.port +"/",
      this.callbacks = [];
    },
    connect: function() {
      this.socket = io.connect(this.url);
      
      this.socket.on('connect', function() {});
      this.socket.on('onconnected', this.onConnect);
      this.socket.on('disconnect', this.onDisconnect);
      this.socket.on('clientconnected', this.onClientConnected);
      this.socket.on('clientdisconnected', this.onClientDisconnected);
      this.socket.on('update', this.publish);
    },
    onConnect: function() {},
    onDisconnect: function() {},
    onClientConnected: function(userId) {},
    onClientDisconnected: function(userId) {},
    send: function(data) {
      this.socket.send( JSON.stringify(data) );
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
