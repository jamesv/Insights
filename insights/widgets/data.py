#####
# Title: insights.widgets.display.py
#
# Handlers to pretty up display
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#
import time

from insights.widgets.display import splitThousands
from insights.core.models import Datum
import logging


class WidgetDataFunctions(object):

    #####
    # Function: getDataCount
    #
    # Gets most recently entered count info
    #
    def getDataCount(self, widget):
        data = Datum.objects.all().filter(widget=widget)[:1]
        if len(data) > 0:
            data = data[0].data_float
        else:
            data = 0

        return {
            'count':      splitThousands(str(data)),
        }

    #####
    # Function: getDataLineGraph
    #
    # Gets data set for drawing a line graph
    #
    def getDataLinegraph(self, widget):
        data_points = Datum.objects.all().filter(widget=widget)[:30]
        graph_points = []
        
        if len(data_points) > 0:
            for data in data_points:
                graph_points.append([data.data_float,int(time.mktime(data.date_created.timetuple()))
                *1000])

        return {
            'graph_points':      graph_points,
        }

    #####
    # Function: getDataHeadline
    #
    # Gets widget's headline copy
    #
    def getDataHeadline(self, widget):
        data = Datum.objects.all().filter(widget=widget)[:1]
        if len(data) > 0:
            data = data[0].data_text
        else:
            data = ""
        
        
        return {
            'headline': data,
        }

    #####
    # Function: getDataProgress
    #
    # Gets current and goal values, then calculates percent complete
    #
    def getDataProgress(self, widget):
        
        data = Datum.objects.all().filter(widget=widget)
        current_data = data.filter(name='current')[:1]
        goal_data = data.filter(name='goal')[:1]
        
        if len(goal_data) > 0 and len(current_data) > 0:
            current_data = current_data[0].data_float
            goal_data = goal_data[0].data_float
            percent = (current_data/goal_data)*100
        else:
            current_data = 0
            goal_data = 0
            percent = 0
            
        return {
            'current':      splitThousands(str(current_data)),
            'goal':         splitThousands(str(goal_data)),
            'percent':      percent,
        }

    def getDataDefault(self, widget):
        return {'error':'Could not find widget type parser'}

    def doCommand(self, cmd, *args):
        return getattr(self, 'getData'+str(cmd).capitalize(), self.getDataDefault)(*args)
        


###
# Function: getWidgetData
#
# Gets widget params and data
#
# Parameters:
#   widgetslot
#
# Returns:
#   widget_content
#
def getWidgetData(widgetslot):
    
    params = {
        'prefix':   "$"
    }
    
    widgets_data_functions = WidgetDataFunctions()
    data = widgets_data_functions.doCommand(widgetslot.widget.widgettype.slug, widgetslot.widget)
    

    widget_content = {'data':data,'params':params,'id':widgetslot.id}
    return widget_content