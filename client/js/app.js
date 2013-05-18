require.config({
  paths: {
    image: 'vendor/requirejs-plugins/image',
    text:  'vendor/requirejs-plugins/text',
    json:  'vendor/requirejs-plugins/json'
  }
});

define(['bootstrap', 'vendor/class', 'image', 'json'], function() {
  
  require(['game'], function(Game) {
    var game = new Game;
    
    game.start();
  });
  
});