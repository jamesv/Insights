#####
# Title: insights.dashboard.urls.py
#
# Controls the direction of various URLs within the site
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#
from django.conf.urls.defaults import *
urlpatterns  = patterns('')

###
# Title: Dashboard routing
#
# routing for end user views
#

urlpatterns += patterns('insights.dashboard.views',
    url(r'^$','home',name='dashboard-home'),
    url(r'^(?P<dashboard_id>\d+)/$','view',name='dashboard-view'),
    url(r'^(?P<dashboard_id>\d+)/(?P<dashboardscreen_id>\d+)/$','viewScreen',name='dashboard-viewScreen'),
)