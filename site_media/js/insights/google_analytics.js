try {
if (!insights.exists) { throw "organicObjUndefined"; }

insights.google_analytics = {
    myService : false,
    scope : 'https://www.google.com/analytics/feeds',
    
    login : function(id) {
      google.accounts.user.login(insights.google_analytics.scope);
      insights.google_analytics.getStatus(id);
    },

    logout : function(id) {
      google.accounts.user.logout();
      insights.google_analytics.getStatus(id);
    },

    getStatus : function(id) {
      var status = $('#widget_'+id+' .status');

      if (!google.accounts.user.checkLogin(insights.google_analytics.scope)) {
        status.html('Please login to continue:<br/> <a href="javascript:insights.google_analytics.login('+id+');"><img src="/site_media/img/google_analytics.png" /></a>');
      } else {
        status.html('<span class="tr block"><a href="javascript:insights.google_analytics.logout('+id+');">Logout</a> &raquo;</span>');
        insights.google_analytics.drawLineGraphOfVisits("linegraph_"+id, $("#linegraph_"+id).data('table_id'))
      }
    },
    
    drawLineGraphOfVisits:function(id, table_id) {
        var analyticsService = new google.gdata.analytics.AnalyticsService('iSample_dataVP_v1.0');

        var SEC_IN_MINUTE   = 60;
        var SEC_IN_HOUR     = SEC_IN_MINUTE*60;
        var SEC_IN_DAY      = SEC_IN_HOUR*24;
        var SEC_IN_MONTH    = SEC_IN_DAY*30;
        var now = new Date()
        var month_ago = new Date(now.getTime() - (1000 * SEC_IN_MONTH))
        
        // The feed URI that is used for retrieving the analytics data
        var feedUri = 'https://www.google.com/analytics/feeds/data' +
            '?start-date='+month_ago.getFullYear()+'-'+insights.utils.padDouble(month_ago.getMonth()+1)+'-'+insights.utils.padDouble(month_ago.getDate()) +
            '&end-date='+now.getFullYear()+'-'+insights.utils.padDouble(now.getMonth()+1)+'-'+insights.utils.padDouble(now.getDate()) +
            '&dimensions=ga:date' +
            '&metrics=ga:visits' +
            '&sort=ga:date' +
            '&ids=ga:' + table_id;

        // callback method to be invoked when getDataFeed() returns data
        var callback = function(result) {
            line_data = []
            // An array of analytics entries
            var entries = result.feed.entry;
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                var datestamp = insights.utils.getGADateObj(entry.getValueOf('ga:date'))
                line_data.push([datestamp.getTime(), entry.getValueOf('ga:visits')])
                
            }
          
          insights.graphing.lineGraph(id, line_data)
        }

        // Error handler
        var handleError = function(error) {
            console.log(error);
        }

        // Submit the request using the analytics service object
        analyticsService.getDataFeed(feedUri, callback, handleError);
    },
    
    init: function(id) {
        insights.google_analytics.myService = new google.gdata.analytics.AnalyticsService('gaExportAPI_dataFeed_v2.0');
        insights.google_analytics.getStatus(id);
    }
    
};

} catch(e) { organic.standard_error_handler(e); }
