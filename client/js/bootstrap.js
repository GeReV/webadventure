define(function() {
  // Avoid `console` errors in browsers that lack a console.
  var method;
  var noop = function noop() {
  };
  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while(length--) {
    method = methods[length];

    // Only stub undefined methods.
    if(!console[method]) {
      console[method] = noop;
    }
  }

  // window.requestAnimationFrame polyfill
  ( function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if(!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if(!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }());
  
  // window.performace polyfill
  (function(w) {
    var perfNow;
    var perfNowNames = ['now', 'webkitNow', 'msNow', 'mozNow'];
    if(!!w['performance'])
      for(var i = 0; i < perfNowNames.length; ++i) {
        var n = perfNowNames[i];
        if(!!w['performance'][n]) {
          perfNow = function() {
            return w['performance'][n]()
          };
          break;
        }
      }
    if(!perfNow) {
      perfNow = Date.now;
    }
    w.perfNow = perfNow;
  })(window);
});
