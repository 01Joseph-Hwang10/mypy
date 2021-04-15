from django.contrib import admin
from apps.models import App, InputSpec


@admin.register(InputSpec)
class InputSpecAdmin(admin.ModelAdmin):

    list_display = (
        'app',
        'name',
        'description',
        'type',
    )


class InputSpecInline(admin.StackedInline):

    model = InputSpec


@admin.register(App)
class AppAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'description',
        'created',
        'exports',
    )

    inlines = (InputSpecInline,)


class AppInline(admin.StackedInline):

    model = App
