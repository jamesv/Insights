#####
# Title: insights.widgets.display.py
#
# Handlers to pretty up display
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#
#from django.db.models import Q
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
        data = Datum.objects.all().filter(widget=widget).filter(name="default")[:1]
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
        data_points = Datum.objects.all().filter(widget=widget).filter(name="default")[:30]
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
            headline = data[0].data_text
            link = data[0].data_link
            source =data[0].data_source
        else:
            headline = ""
            link = ""
            source = ""
        
        
        return {
            'headline': headline,
            'link': link,
            'source': source,
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

    #####
    # Function: getDataRss
    #
    # Gets feed and params for RSS display
    #
    def getDataRss(self, widget):

        data = Datum.objects.all().filter(widget=widget)
        feed_data = data.filter(name='feed')[:1]
        count_data = data.filter(name='count')[:1]
        author_data = data.filter(name='show_author')[:1]
        
        feed_url = "http://news.google.com/news?ned=us&topic=h&output=rss"
        display_count = 5
        show_author = "true";
        
        if len(feed_data):
            feed_url = feed_data[0].data_text

        if len(count_data):
            display_count = int(count_data[0].data_float)

        if len(author_data):
            show_author = author_data[0].data_text


        return {
            'feed_url':         feed_url,
            'display_count':    display_count,
            'show_author':      show_author,
        }
        
    #####
    # Function: getDataValues
    #
    # Gets key/value pairs
    #
    def getDataValues(self, widget):

        data_points = Datum.objects.all().filter(widget=widget)
        obj = {}
        for data in data_points:
            obj[data.name] = data.data_text

        return obj
    

    def getDataDefault(self, widget):
        return {'error':'Could not find widget type parser'}

    def doCommand(self, cmd, *args):
        return getattr(self, 'getData'+str(cmd).capitalize(), self.getDataDefault)(*args)
        


###
# Function: getWidgetSlotData
#
# Gets widget params and data
#
# Parameters:
#   widgetslot
#
# Returns:
#   widget_content
#
def getWidgetData(widget):
    widgets_data_functions = WidgetDataFunctions()
    return widgets_data_functions.doCommand(widget.widgettype.slug, widget)
    
def getWidgetSlotData(widgetslot):
    
    params = {
        'prefix':   ""
    }
    
    data = getWidgetData(widgetslot.widget)

    widget_content = {'data':data,'params':params,'id':widgetslot.id}
    return widget_content