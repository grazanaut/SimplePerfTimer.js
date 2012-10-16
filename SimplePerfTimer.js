(function(){

  var _spt = window.SimplePerfTimer;

  /**
   * @param {String} name The name of the timer (used in logging)
   * @param {Boolean} [wait] Optional (default false) Whether to start immediately or wait. Will wait if true
   * @param {String|Function} [logMethod] Optional. An alternative method (string name) if console.log is not to be used
   * @param {Object} [logContext] If a string method name passed in for logging, use "this" context
   */
  //If you want to just use the timer inline, rather than
  //pulling in the entire file, simply copy this constructor
  //method
  function SimplePerfTimer(name, wait, logMethod, logContext) {
      //set up default logger (so it can be overridden globally if desired)
      if (typeof SimplePerfTimer.log !== "function") {
        SimplePerfTimer.log = function(s) {
          console.log(s);
        };
      }

      //Set up flexible param list
      if (typeof wait === "function" || typeof wait === "string") {
        logContext = logMethod;
        logMethod = wait;
        wait = false;
      }
      var log;
      if (typeof logMethod === "string") {
        log = function(s) {
          logContext[logMethod](s);
        };
      }
      else if (typeof logMethod === "function") {
        log = logMethod;
      }
      else {
        log = SimplePerfTimer.log;
      }

      var start, end;
      this.start = function() {
          start = (new Date()).getTime();
          log(name + " start: " + start);
      };
      this.end = function() {
          end = (new Date()).getTime();
          log(name + " end: " + end);
          log(name + " time: " + (end - start));
      };
      if (!wait) {
          this.start();
      }
  }
  //end of method (to be pulled in if you don't want a module


  SimplePerfTimer.noConflict = function(){
    var SPT = SimplePerfTimer;
    if (typeof _spt === "undefined") {
      delete window.SimplePerfTimer;
    }
    else {
      window.SimplePerfTimer = _spt;
    }
    return SPT;
  };

  if (typeof define === "function" && define.amd) {
    define("SimplePerfTimer", [], function() {
      //make the assumption that if this is AMD we don't want global, but only
      //if we actually load it with AMD - if there's an AMD module loader, it doesn't
      //necessarily mean we're going to use it, so we only call noConflict in here
      SimplePerfTimer.noConflict();
      return SimplePerfTimer;
    });
  }


}());
