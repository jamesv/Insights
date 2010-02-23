try {
if (!organic.exists) { throw "organicObjUndefined"; }

organic.tracking = {
	trackers:           [],
	page_info: {
	    'environment':  false,
	    'page_path':    false,
	    'page_title':   false
	},
	environment_prefixes: {  
	    'www':          'prod',
	    'uat':          'uat',
	    'test':         'test'
	    /*
    	Override/append this object if client hosting setup does not match usual enviroment pattern

    	eg: 
    	'review':                   'test',
    	'client.thirdparty.com':    'test'
    	*/
	},
	DEFAULT_INDEX:      'index.html',
	
	init: function() {
	    var page_info = $o.tracking.page_info;

	    /*
	        Determine current enviroment
	    */
	    var environment_prefixes = $o.tracking.environment_prefixes;
	    var current_environment = false;
	    var hostname = window.location.hostname;

        /*
            Adds default "www" subdomain to raw domain names
        */
	    var hostname_pieces = hostname.split(".");
	    if(hostname_pieces.length == 2) {
	        hostname = "www." + hostname;
	    }
	    
	    /*
	        Iterates over known environment prefixes looking for a match
	    */
	    for(environment in environment_prefixes) {
	        if(hostname.indexOf(environment) == 0) {
	            current_environment = environment_prefixes[environment];
	            break;
	        }
	    }
	    page_info['environment'] = current_environment || "local";
	    
	    
	    /*
	        Determine current page path
	    */
	    var path = window.location.pathname;
	    var path_file = "";
	    var path_pieces = path.split("/");
	    
        /*
            Check for filename, otherwise, use default
        */
	    if(path_pieces[path_pieces.length - 1].indexOf(".") != -1) {
	       path_file = "/" + path_pieces.pop(); 
	    } else {
	        path_file = "/" + this.DEFAULT_INDEX;
	    }
	    
	    /*
	        If there was a trailing slash on the path, remove it.
	    */
	    if(path_pieces[path_pieces.length - 1] == "") {
	        path_pieces.pop();
        }
	    
	    page_info['page_path'] = path_pieces.join("/");
	    
	    page_info['page_file'] = path_file;
	    
	    
	    
	    /*
	        Determine page title
	    */
	    page_info['page_title'] = $o.utils.stringCleaner(document.title);
	    
	    
	    /*
	        Setup trackers for this page
	    */
	    if($o.exists('TRACKERS')) {
	        for(var tracker_count in TRACKERS) {
                var tracker_obj = TRACKERS[tracker_count];
                if($.isFunction($o.trackers[tracker_obj['type']])){
                    var tracker = new $o.trackers[tracker_obj['type']](tracker_obj);
                    //tracker.track.scope  = tracker;
                    if(tracker.params) {
                        $o.tracking.trackers.push(tracker);
                    }
                } else {
                    $o.debug("Can not create tracker of type: " + tracker_obj['type'], false);
                }
	        }
	    }
	    
	    // NOTE : handle initial page track by default
	    // onReady
	    // $o.tracking.track.page();
    },
    
    track:{
        'page': function(args) {
            var args = args || {};
            //$o.debug("track page");
            for (var tracker in $o.tracking.trackers) {
                $o.tracking.trackers[tracker].track.page(args);
            } 
        },
        'link': function(args) {
            var args = args || {};
            for (var tracker in $o.tracking.trackers) {
                $o.tracking.trackers[tracker].track.link(args);
            } 
        }
            
    },
    
    info: function() {
        return $o.tracking.page_info;
    }

};

//Base tracker class, all other implementations should extend
organic.trackers = {};
organic.trackers.Base = Class.extend({
    type:false,
    params:false,
    track: {
        page: function(args) {
            this.getParams()
            $o.debug("Tracker has not implemented track.page()", false);
        },
        link: function(args) {
            $o.debug("Tracker has not implemented track.link()", false);
        }
    },
    init: function(args){
    },
    getParams: function(args){
        try {
            var page_env = $o.tracking.page_info['environment']
            this.params = (args['environments'][page_env]) ? args['environments'][page_env] : args['environments']['default'];
        } catch(err) {
            // no params for this Tracker/Environment combo
        }
    },
    getPath: function(args){
        var path_base = (args['path']) ? args['path'] : $o.tracking.page_info['page_path'];
        var path_append = (args['path_append']) ? args['path_append'] : $o.tracking.page_info['page_file'];
        return path_base + path_append;
    },
    getPageName: function(args){
        var name_base = (args['name']) ? $o.utils.stringCleaner(args['name']) : $o.tracking.page_info['page_title'];
        var name_append = (args['name_append']) ? "_" + $o.utils.stringCleaner(args['name_append']) : "";
        return name_base + name_append;
    },
    useDefaultIndex: function(pathname) {
        if(pathname.charAt(pathname.length - 1) == "/") {
            pathname += organic.tracking.DEFAULT_INDEX;
        }
        return pathname;
    }
});
$(document).ready(function(){organic.tracking.init()});
} catch(e) { organic.standard_error_handler(e); }

