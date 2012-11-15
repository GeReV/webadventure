define(['bootstrap'], function() {
  
  require(['game'], function(Game) {
    var game = new Game;
    
    game.run();
  });
  
});