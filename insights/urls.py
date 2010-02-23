#####
# Title: insights.urls.py
#
# Controls the direction of various URLs within the site
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#
from django.conf.urls.defaults import *
from django.conf import settings

urlpatterns  = patterns('')

urlpatterns += patterns('',
    (r'^site_media/(?P<path>.*)$',  'django.views.static.serve',
                                    {'document_root': settings.MEDIA_ROOT}),

    (r'^$',                         'insights.dashboard.views.home'),
    (r'^dashboard/',                include('insights.dashboard.urls')),
    (r'^accounts/',                 include('insights.accounts.urls')),
)
