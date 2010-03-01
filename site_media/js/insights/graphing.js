try {
if (!insights.exists) { throw "organicObjUndefined"; }

insights.graphing = {
    
    lineGraph: function(id, line_data){

    	var data = {
    			data: 	line_data,
    			lines:  {
    				show:       true, 
    				fill:       true, 
    				fillColor:  "rgba(255, 255, 255, .05)", 
    				lineWidth:  2
    			},
    			points: {
    				show:       true,
    				radius:     3,
    				lineWidth:  0,
    				fill:       true, 
    				fillColor:  "rgba(255, 255, 255, 1)", 
    			},

    			color:          "rgba(131, 174, 189, 1)",
    			shadowSize:     0
    		}


    	var options = {
    		grid: {
    			borderWidth:    0,
    			color:          "#bbbbbb",
    			tickColor:      "rgba(190, 190, 190, 1)",
    			outset:         6
    		},
    		xaxis: {
    		    mode:           "time"
    		},
    		yaxis: {
    			ticks:          0,
    		}
    	}
    	$("#"+id).removeClass('hider');
        $.plot($("#"+id), [data], options);

    },
    
    barGraph: function(id, line_data){

    	var data = {
    			data: 	line_data,
    			bars:  {
    				show:       true, 
    				fill:       true, 
    				fillColor:  "rgba(131, 174, 189, .85)", 
    				lineWidth:  1,
    				barWidth:   .5 
    			},
    			color:          "rgba(131, 174, 189, 1)",
    			shadowSize:     0
    		}


    	var options = {
    		grid: {
    			borderWidth:    0,
    			color:          "#bbbbbb",
    			tickColor:      "rgba(190, 190, 190, .5)",
    			outset:         6
    		},
    		xaxis: {
    		    ticks: [[0.25,"Sun"],[1.25,"Mon"],[2.25,"Tue"],[3.25,"Wed"],[4.25,"Thu"],[5.25,"Fri"],[6.25,"Sat"]],
    		},
    		yaxis: {
    			ticks:          0,
    		}
    	}
    	$("#"+id).removeClass('hider');
        $.plot($("#"+id), [data], options);

    },
    
    barGraph_RssByDay: function(id, feed_url){
        var feed = new google.feeds.Feed(feed_url);
        var posts_per_day = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]]
        feed.setNumEntries(64)
        feed.load(function(result) {
            if (!result.error) {
                entries = result.feed.entries.length
                for (var i = 0; i < entries; i++) {
                    var entry = result.feed.entries[i];
                    var date = new Date(Date.parse(entry.publishedDate))
                    posts_per_day[date.getDay()][1] += 1
                }
            }
            console.log(posts_per_day)
            insights.graphing.barGraph(id, posts_per_day)
        });
        
        
    },
    
    init: function() {

    }
    
};
$(function(){insights.utils.init()});
} catch(e) { organic.standard_error_handler(e); }
