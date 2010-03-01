/*
In house helper plugins
*/
jQuery.fn.extend({
    loadPage: function(id, url) {
        organic.tracking.track.page(url);
        $('#'+id).load(url);
    },
    
    liveLoadPage: function(elem, id_override) {
        var url = $(elem).attr("href");
        var id = id_override || $(elem).attr("rel");
        $().loadPage(id, url);
    }
    
});