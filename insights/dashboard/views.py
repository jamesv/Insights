#####
# Title: insights.dashboard.views.py
#
# Display views for end client dashboards
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.utils.safestring import mark_safe

from insights.core.models import Dashboard
from insights.widgets.core import getWidgetXHTML

###
# Function: home
#
# Dashboard home view
#
# Parameters:
#
# Returns:
#   *render_to_response*
#
@login_required(redirect_field_name='redirect_to')
def home(request):
    if request.session.get('dashboard_id', False):
        return HttpResponseRedirect("/dashboard/%s/" % (request.session['dashboard_id']))
    else:
        dashboards = Dashboard.objects.filter(user=request.user)
        return render_to_response("dashboard/home.html",{'dashboards':dashboards, },context_instance=RequestContext(request))
    
###
# Function: view
#
# Dashboard view
#
# Parameters:
#   id
#
# Returns:
#   *render_to_response*
#
@login_required(redirect_field_name='redirect_to')
def view(request, dashboard_id):
    try:
        dashboard = Dashboard.objects.get(id=int(dashboard_id)) # HACK - ensure user has permissions
    except:
        del request.session['dashboard_id']
        return HttpResponseRedirect("/")
    if request.session.get('dashboard_id', False) != dashboard_id:
        request.session['dashboard_id'] = dashboard_id

    nav = []
    dashboardscreens = dashboard.dashboardscreen_set.all()
    for dashboardscreen in dashboardscreens:
        nav.append([dashboardscreen.title, "%s" % dashboardscreen.id, "%s/" % dashboardscreen.id])

    dashboardscreen = ""
    if len(dashboardscreens) > 0:
        dashboardscreen = mark_safe(viewScreen(request, dashboard_id,dashboardscreens[0].id).content)
    
    return render_to_response("dashboard/view.html",{'nav':nav, 'dashboard':dashboard, 'dashboardscreen':dashboardscreen, 'theme':dashboard.theme.slug, },context_instance=RequestContext(request))
        
        
###
# Function: viewScreen
#
# DashboardScreen view
#
# Parameters:
#   id
#   tab
#
# Returns:
#   *render_to_response*
#
@login_required(redirect_field_name='redirect_to')
def viewScreen(request, dashboard_id, dashboardscreen_id, dashboard=False):
    if not dashboard:
        try:
            dashboard = Dashboard.objects.get(id=int(dashboard_id)) # HACK - ensure user has permissions
        except:
            dashboard = False

    widgets = []
    try:
        dashboardscreen = dashboard.dashboardscreen_set.get(id=dashboardscreen_id)
        for widgetslot in dashboardscreen.widgetslot_set.all():
            widgets.append({'id':widgetslot.id, 'title':widgetslot.widget.title, 'style': widgetslot.widget.widgettype.slug,'contents':getWidgetXHTML(widgetslot)})
    except:
        widgets = []
    if len(widgets) < 1:
        widgets.append({'id':'error', 'title':'No widgets could be found for this screen', 'style':'info','contents':mark_safe('Add some from within the admin.')})
    return render_to_response("dashboard/view_screen.html",{'widgets':widgets, 'dashboardscreen_id':dashboardscreen_id},context_instance=RequestContext(request))
