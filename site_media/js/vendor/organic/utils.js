try {
if (!organic.exists) { throw "organicObjUndefined"; }

organic.utils = {
    
	stringCleaner: function(str) {
	    str = str.replace(/[^a-zA-Z 0-9]+/g,'');    // remove non-alphanumeric characters
	    str = $.trim(str.toLowerCase());          // trim leading/trailing whitespace and convert to lowercase
	    str = str.replace(/[\ ]+/g,'_');            // replace whitespace with underscore
	    return str;
	},
	
	init: function() {

    }
    
};
$(function(){organic.utils.init()});
} catch(e) { organic.standard_error_handler(e); }
