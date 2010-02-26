try {
if (!insights.exists) { throw "organicObjUndefined"; }
if (!insights.widgets) { insights.widgets = {}; }

insights.widgets.rss = {
    
    loadFeed: function(id, feed, display_count, show_author) {
        console.log(id + " _ " + feed);
        
        var feed = new google.feeds.Feed(feed);
        feed.load(function(result) {
            if (!result.error) {
                display_count = (result.feed.entries.length < display_count) ? result.feed.entries.length : display_count;
                var container = $("#"+id);
                for (var i = 0; i < display_count; i++) {
                    var entry = result.feed.entries[i];
                    var li = $("<li></li>")
                    li.append("<a href='"+entry.link+"'>" + entry.title + "</a>");
                    cite = "";
                    if(show_author){
                        cite += "<cite>"+entry.author+"</cite> - ";
                    }
                    cite += "<span class='humanizeTime' title='"+entry.publishedDate+"'>"+entry.publishedDate+"</span>";
                    
                    li.append($("<div>"+cite+"</div>"))
                    container.append(li);
                }
                insights.utils.humanizeTime();
            }
        });
        
    },
    
    init: function() {

    }
    
};
$(function(){insights.widgets.rss.init()});
} catch(e) { organic.standard_error_handler(e); }