#####
# Title: insights.data.views.py
#
# Methods to parse data from outside sources
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext
from django.utils.safestring import mark_safe
from django.db.models import Q
import httplib, urllib, json, logging

from insights.core.models import Widget, Datum

###
# Function: home
#
# Data home view
#
# Parameters:
#
# Returns:
#   *render_to_response*
#
def home(request):
    widgets = Widget.objects.exclude(Q(widgettype__data__isnull=True) | Q(widgettype__data__exact=''))
    run_list = ""
    for widget in widgets:
        run_list += "/data/"+widget.widgettype.data+"/"+str(widget.id)+"/\n"
    
    return HttpResponse(run_list)

###
# Function: twitterFollowers
#
# Parse
#
# Parameters:
#
# Returns:
#   *render_to_response*
#
def twitterFollowers(request, widget_id=False):
    try:
        widget = Widget.objects.get(id=int(widget_id))
        username = Datum.objects.get(widget=widget, name="id")
        username = username.data_text
        params = urllib.urlencode({})
        headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
        conn = httplib.HTTPConnection("api.twitter.com:80")
    
        conn.request("GET", "/1/users/show/"+username+".json", params, headers)
        response = conn.getresponse()
        response_data = json.loads(response.read())
        conn.close()
    
    
        follower_count = response_data['followers_count']
        datum = Datum(widget=widget, data_float=float(follower_count))
        datum.save()
        return HttpResponse(username + ":" + str(follower_count))
    except:
        return HttpResponse("failed")