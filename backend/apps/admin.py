from django.contrib import admin
from apps.models import App


@admin.register(App)
class AppAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'description',
        'created',
        'exports',
    )


class AppInline(admin.StackedInline):

    model = App
