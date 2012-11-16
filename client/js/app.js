require.config({
  paths: {
    image: 'vendor/requirejs-plugins/image'
  }
});

define(['bootstrap', 'vendor/class'], function() {
  
  require(['game'], function(Game) {
    var game = new Game;
    
    game.run();
  });
  
});