from django.db import models
from django.contrib.auth.models import User

from datetime import datetime

class Theme(models.Model):
    title = models.CharField(max_length=30)
    slug = models.CharField(max_length=30, default='default')

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ('title',)

class Dashboard(models.Model):
    title = models.CharField(max_length=30)
    user = models.ManyToManyField(User)
    theme = models.ForeignKey(Theme)

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ('title',)
    
class DashboardScreen(models.Model):
    title = models.CharField(max_length=30)
    dashboard = models.ForeignKey(Dashboard)

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ('title',)


class WidgetType(models.Model):
    title = models.CharField(max_length=30)
    template = models.CharField(max_length=30)
    slug = models.CharField(max_length=30)

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ('title',)

class Widget(models.Model):
    title = models.CharField(max_length=30)
    widgettype = models.ForeignKey(WidgetType)

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ('title',)
        
class WidgetSlot(models.Model):
    weight = models.IntegerField(default=0)
    widget = models.ForeignKey(Widget)
    dashboardscreen = models.ForeignKey(DashboardScreen)

    def __unicode__(self):
        return "%s :: %s - %s" % (self.dashboardscreen.dashboard.title ,self.dashboardscreen.title, self.widget.title)

    class Meta:
        ordering = ('dashboardscreen','weight',)
        
        
class Datum(models.Model):
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    widget = models.ForeignKey(Widget)
    name = models.CharField(max_length=30, default='default')
    
    data_float = models.FloatField(null=True, blank=True)
    data_text = models.TextField(null=True, blank=True)
    data_link = models.CharField(max_length=100, null=True, blank=True)
    data_source = models.CharField(max_length=100, null=True, blank=True)
    
    def __unicode__(self):
        return "%s - %s - %s" % (self.date_modified, self.widget.title, self.name)
        
    class Meta:
        ordering = ('-date_created',)

    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        self.date_modified = datetime.now()
        super(Datum, self).save()
    
        

