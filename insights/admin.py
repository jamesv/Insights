from django.contrib import admin
from core.models import Dashboard, DashboardScreen, WidgetSlot, WidgetType, Widget, Theme, Datum

admin.site.register(Dashboard)
admin.site.register(DashboardScreen)
admin.site.register(WidgetSlot)
admin.site.register(WidgetType)
admin.site.register(Widget)
admin.site.register(Theme)
admin.site.register(Datum)
