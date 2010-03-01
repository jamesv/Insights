#####
# Title: insights.widgets.core.py
#
# Core widget handling utils
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#

from django.shortcuts import render_to_response
from django.utils.safestring import mark_safe

from insights.widgets.data import getWidgetData

###
# Function: getWidgetXHTML
#
# Draws the output
#
# Parameters:
#   widgetslot - WidgetSlot entity
#
# Returns:
#   widget_html
#
def getWidgetXHTML(widgetslot):

    widget_content = getWidgetData(widgetslot)
        
    widget_html = render_to_response("widgets/"+widgetslot.widget.widgettype.template+".html", widget_content).content
    return mark_safe(widget_html)
