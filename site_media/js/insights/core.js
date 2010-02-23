(function() {
insights =
{
    exists: true,                       // Allows future modules to validate that the core system is loaded    
    
    init: function() {
        
    },
    
    setTab: function(id) {
        $('#header .current').removeClass('current');
        $('#dashboardscreen_'+id).addClass('current');
    }
}

insights = window.insights;
$(document).ready(function(){insights.init()});
})();

