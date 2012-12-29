define(['bootstrap', 'vendor/class', 'image'], function() {
  var Core = Class.extend({
    init: function() {
      this.Core();
    },
        
    // constructor
    Core: function() {
      this._run();
    },
    
    // used by system to initialize with some values
    params: {},
    
    stateChange: new Event(),

    setState: function(state, active) {
      this._state[state] = active;
      this.stateChange(state, this._state);
    },
    
    _outputSystems: [],
    
    _logicSystems: [],
    
    _state: {},
    
    _systems: {},
    
    _outputAdd: function(sys) {
      this._outputSystems.push(sys);
      this._systems[sys.type] = sys;
    },
    
    _logicAdd: function(sys) {
      this._logicSystems.push(sys);
      this._systems[sys.type] = sys;
    },
    
    _proccessLogic: function(t, dt) {
      this._proccess(this._logicSystems, t, dt);
    },
    
    _proccessOutput: function(t, dt) {
      this._proccess(this._outputSystems, t, dt);
    },
    
    _proccess: function(systems, t, dt) {
      for(var i = 0, sys; sys = systems[i]; i++)
        sys.enabled && sys.proccess(t, dt); // proccess only if enabled
    },
        
    _run: function() {
      var time = 0,
          deltaTime = 0.03; // update each interval in seconds,
          currentTime = window.perfNow() / 1000, // Maybe delegate this to an outer Timer class.
          newTime = 0,
          frameTime = 0,
          accumulator = 0,
          alpha,
          that = this;
        
      function frameUpdate() {
        window.requestAnimationFrame(frameUpdate); // very important for requestAnimationFrame call to be located before everything
        
        newTime = window.perfNow() / 1000,
        frameTime = newTime - currentTime;
        
        if (frameTime > deltaTime * 10) {
          frameTime = deltaTime * 10; // avoiding spiral of death
        } 

        currentTime = newTime;
        
        accumulator += frameTime;
    
        while(accumulator >= deltaTime) {
          this._proccessLogic(time, deltaTime); 
          
          time += deltaTime;
          accumulator -= deltaTime
        }
        
        alpha = accumulator / deltaTime;
    
        this._proccessOutput(time + alpha, alpha);
      };

      window.requestAnimationFrame(frameUpdate);
    },
  
  });
  
  return new Core();
});
