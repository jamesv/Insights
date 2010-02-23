(function() {
organic =
{
    exists: true,                       // Allows future modules to validate that the core system is loaded
    show_debug: $.query.get('debug'),   // Debug mode on?
    has_console: true,                  // Does current browser env support console logging?
    
    debug:  function(str, pass_fail) {
        if($o.show_debug) {
            if($o.has_console) {
                if(pass_fail === false) {
                    console.warn("FAILED: " + str);
                } else {
                    console.log(str);
                }
            }
        }
    },
    
    exists: function(obj) {
        var does_exist = (eval('typeof '+obj) != "undefined");
        $o.debug(obj + " exists", does_exist);
        return does_exist;
    },
    
    // function standard_error_handler
	// Runs the standard error handler which merely logs errors to the console. Typically called via catch{} blocks.
	// PARAMS
	//     error: [required] The thrown Error() object or a string describing the error
	standard_error_handler: function(error) {
		// If a string was provided, simply log the error string
		if (typeof(error) == "string" || typeof(error) == "STRING") {
			var error_msg = 'error: '+error;
		}
		// If an Error() was thrown, log its name and message.
		// If the browser provides it, also log the file name and line number of the error.
		else {
			var error_msg = "error ("+error.name;
			if (error.lineNumber) {
				error_msg += ", line "+error.lineNumber+", "+error.fileName;
			}
			error_msg += "): "+error.message;
		}
		$o.debug(error_msg);
	},
    
    init: function() {
        //Ensures that a "console.log" func exists, to avoid breakage during debuging
        try { console.log('...'); } catch(e) { console = { log: function() {} }; $o.has_console = false; }
		
        /*
            JQuery live functions
        */
        //ensure all live load pages operate properly
        $('.live') 
    	    .live('click', function(e) {
    	        e.preventDefault();
    	        $().liveLoadPage(this);
    			return false;
    	    });

        // submit containing form
        $('.submitForm')
            .live('click',
                function(e) {
                    e.preventDefault();
                    $(this).closest('form').submit();
            	}
            );

    }
}

$o = organic = window.organic;
$(document).ready(function(){organic.init()});
})();


// Simple JavaScript Inheritance
// http://ejohn.org/blog/simple-javascript-inheritance/
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);       
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
