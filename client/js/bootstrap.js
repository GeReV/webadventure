define(function() {
  (function(w) {
    // Avoid `console` errors in browsers that lack a console.
    var method;
    var noop = function noop() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (w.console = w.console || {});
  
    while(length--) {
      method = methods[length];
  
      // Only stub undefined methods.
      if(!console[method]) {
        console[method] = noop;
      }
    }
  })(window);

  // w.requestAnimationFrame polyfill
  (function(w) {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !w.requestAnimationFrame; ++x) {
      w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame'];
      w.cancelAnimationFrame = w[vendors[x] + 'CancelAnimationFrame'] || w[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!w.requestAnimationFrame) {
      w.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = w.setTimeout(function() { callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!w.cancelAnimationFrame) {
      w.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  })(window);
  
  // w.performace polyfill
  (function(w) {
    var perfNow;
    var perfNowNames = ['now', 'webkitNow', 'msNow', 'mozNow'];
    
    if(!!w['performance']) {
      for(var i = 0; i < perfNowNames.length; ++i) {
        var n = perfNowNames[i];
        if(!!w['performance'][n]) {
          perfNow = function() {
            return w['performance'][n]();
          };
          break;
        }
      }
    }
    
    if(!perfNow) {
      perfNow = Date.now;
    }
    
    w.perfNow = perfNow;
  })(window);
});
