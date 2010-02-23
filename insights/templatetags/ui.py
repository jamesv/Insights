#####
# Title: insights.templatetags.ui.py
#
# Draws UI snippets
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#

from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe
from django import template
from django.conf import settings

import logging

register = template.Library()


###
# Function: drawNav
#
# Draws header nav
#
# Parameters:
#   nav (array of tuples)
#
# Returns:
#   nav_str
#
@register.filter
def drawNav(nav):
    logging.error(nav)
    if nav == '':
        nav = settings.DASHBOARD_DEFAULTS['nav']
        
    
    nav_str = ""
    for nav_item in nav:
        nav_str += "<li id='dashboardscreen_%s'><a href='%s' class='live' rel='w'>%s</a></li>" % (conditional_escape(nav_item[1]), conditional_escape(nav_item[2]), conditional_escape(nav_item[0]))
    return mark_safe(nav_str)
    
