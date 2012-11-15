define([
	'../vendor/jquery-1.8.2.min.js'
],function() {
  var World = Class.extend({
  	Elemnt: $('#gameArea'),
  	Context: null
    Init: function() {
    	var _this = this;
    	if (_this.Elemnt.length == 0)
    		throw "No Canvas Existed on Dom";
    	_this.Elemnt = _this.Elemnt[0];
    	_this.Context = _this.Elemnt.getContext('2d');
    },
    Draw: function() {}
  });
  
  return World;
});