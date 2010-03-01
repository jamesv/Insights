#####
# Title: insights.accounts.urls.py
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
# Title: Account routing
#
urlpatterns += patterns('',
    (r'^login/$', 'django.contrib.auth.views.login',{'template_name': 'accounts/login.html'}),
    (r'^logout/$', 'django.contrib.auth.views.logout',{'template_name': 'accounts/logout.html'}),
)

urlpatterns += patterns('insights.accounts.views',
    #url(r'^$','foo',name='accounts-foo'),
)


