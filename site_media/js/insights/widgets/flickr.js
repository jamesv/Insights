try {
if (!insights.exists) { throw "organicObjUndefined"; }
if (!insights.widgets) { insights.widgets = {}; }

insights.widgets.flickr = {
    API_KEY: 'd103c1d422db83b696ad7e084b7ce388',
    API_SECRET: '28058e9b0909c282',
    FLICKR_SEARCH: 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&jsoncallback=?&api_key=',
    FLICKR_PHOTOS : 5,
    
    drawFlickrPhotos: function(params, id){
        var flickr_id = id;
        $.getJSON(this.FLICKR_SEARCH + params,
            function(data){
                var flickr_container = $("#"+flickr_id);
                $.each(data.photos.photo, function(i,photo){
                    console.log(photo);
                    var photo_url = "http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
                    var link_url = "http://www.flickr.com/photos/"+photo.owner+"/"+photo.id+"/";
                    flickr_container.append("<li><a href='"+link_url+"'><img src='"+photo_url+"' /></a></li>");
                    if ( i == insights.widgets.flickr.FLICKR_PHOTOS ) return false;
                });
            });
    },
    
    init: function() {
        this.FLICKR_SEARCH += this.API_KEY;
    }
    
};
$(function(){insights.widgets.flickr.init()});
} catch(e) { organic.standard_error_handler(e); }

