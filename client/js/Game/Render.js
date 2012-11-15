define([
	'World'
	],
	function() {
  var Render = Class.extend({
    Init: function() {
      
    },
    Render: function () {

    },
    OnPreRender: function (callback) {
    	callback();
    },
    OnPostRender: function (callback) {
    	callback();
    }
  });
  
  return Render;
});