try {
if (!insights.exists) { throw "organicObjUndefined"; }

insights.utils = {
    
    humanizeTime: function(){

        var SEC_IN_MINUTE   = 60;
        var SEC_IN_HOUR     = SEC_IN_MINUTE*60;
        var SEC_IN_DAY      = SEC_IN_HOUR*24;

        var now = new Date()
        var now_in_sec = now.getTime()/1000;

        $(".humanizeTime").each(function(){
            var time = $(this);
            var human_time = ""
            var seconds_ago = now_in_sec - (Date.parse(time.attr('title'))/1000);
            console.log(seconds_ago)
            if 
            (seconds_ago < 120) {                   // <2 minutes
                human_time = "moments ago";
            } else if (seconds_ago < 2700) {        // 2-45 minutes
                human_time = Math.round(seconds_ago/SEC_IN_MINUTE) + " minutes ago";
            } else if (seconds_ago < 5400) {        // 45-90 minutes
                human_time = "an hour ago";
            } else if (seconds_ago < 79200) {       // 90 minutes-22 hours
                human_time = Math.round(seconds_ago/SEC_IN_HOUR) + " hours ago";
            } else if (seconds_ago < 129600) {      // 22-36 hours
                human_time = "about a day ago";
            } else if (seconds_ago < 1209600) {     // 36 hours-14 days
                human_time = Math.round(seconds_ago/SEC_IN_DAY) + " days ago";
            } else {                                // more than 14 days
                human_time = time.html()
            }
            time.html(human_time);
            
        });
    },
    
    init: function() {

    }
    
};
$(function(){insights.utils.init()});
} catch(e) { organic.standard_error_handler(e); }
