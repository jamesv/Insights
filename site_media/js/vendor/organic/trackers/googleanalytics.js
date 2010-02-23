organic.trackers.GoogleAnalytics = organic.trackers.Base.extend({
    type:'googleanalytics',
    track:{
        page: function(args) {
            $o.debug("GA page tracking");
            var path = this.scope.getPath(args);
            var page_name = this.scope.getPageName(args);

            for(var env in this.scope.params) {
                env = this.scope.params[env];
                $o.debug("  account: " + env['acct']);
                $o.debug("  path: " + env['base'] + path);
                env['tracker']._trackPageview(env['base'] + path);
                
            }
            $o.debug("---");
        }
    },
    init: function(args){
        this.track.scope = this;
        this.getParams(args);
        for(var env in this.params) {
            env = this.params[env];
            if(!env['base']) {
                env['base'] = '';
            }
            env['tracker'] = _gat._getTracker(env['acct']);
            
        }
    }
});
