organic.trackers.WebSideStory = organic.trackers.Base.extend({
    type:'websidestory',
    TRACKER:false,
    ACCOUNTS:false,
    BASE_MLC:false,
    track:{
        page: function(args) {
            var mlc = this.scope.BASE_MLC.split("{mlc}").join(this.scope.getPath(args));
            var page_name = this.scope.getPageName(args);
            
            $o.debug("WSS page tracking");
            $o.debug("  mlc: " + mlc);
            $o.debug("  pagename: " + page_name);
            $o.debug("---");
            //_hbPageView(page_name, mlc);
        },
        link: function(args) {
            //_hbLink(lid, lpos);
        }
    },
    
    init: function(args){
        this.track.scope = this;
        this.getParams(args);
        for(var env in this.params) {
            env = this.params[env];
            
            // Since all WSS accounts are fired with one call, create shorthand variables combining the accounts
            if(this.ACCOUNTS) {
                this.ACCOUNTS += ";";
            } else {
                this.ACCOUNTS = "";
            }
            this.ACCOUNTS += env['acct'];
            
            
            if(this.BASE_MLC) {
                this.BASE_MLC += ";";
            } else {
                this.BASE_MLC = "";
            }
            this.BASE_MLC += env['base'] || "";
            this.BASE_MLC += "{mlc}";
            
        }

        _hbEC=0,_hbE=new Array;function _hbEvent(a,b){b=_hbE[_hbEC++]=new Object();b._N=a;b._C=0;return b;}
        this.TRACKER = _hbEvent("pv");
        this.TRACKER.vpc="HBX0100u";
        this.TRACKER.gn = env['gn'];
        
        this.TRACKER.acct=this.ACCOUNTS;
    }
});