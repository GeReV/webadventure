define([
	'World',
]
	,function() {
  var MapObject = Class.extend(World,{
  	GameObjectsData: null;
    Init: function() {
    	var _this = this;
    	_this.Context.fillStyle = "rgba(0, 0, 255, .5)";
		_this.Context.context.fillRect(25, 25, 125, 125);
		_this._loadGameElemetns();
		_this.Draw();
    },
    _loadGameElemetns: function () {

    },
    Draw: function() {}
  });
  
  return World;
});