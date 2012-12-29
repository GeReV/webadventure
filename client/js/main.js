require.config({
  paths: {
    image: 'vendor/requirejs-plugins/image'
  }
});

define(['bootstrap', 'vendor/class', 'image'], function() {
  require(['game']); // load game
});