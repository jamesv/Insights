from django.conf.urls.defaults import *
from django.contrib import admin
admin.autodiscover()

import insights.urls


urlpatterns = patterns('',
    (r'^tools/', include(admin.site.urls)),
)

urlpatterns += insights.urls.urlpatterns