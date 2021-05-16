from django.contrib import admin
from apps.models import App, InputSpec
import subprocess
import shutil


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


@admin.action(description="Break deployment")
def delete_app(self, request, queryset):

    for item in queryset:
        save_directory = item.app
        subp = subprocess.Popen(
            ['docker-compose', 'down'], cwd=save_directory
        )
        subp.wait()
        shutil.rmtree(save_directory)
        item.delete()


@admin.register(App)
class AppAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'description',
        'created',
        'exports',
    )

    inlines = (InputSpecInline,)

    actions = (delete_app, )


class AppInline(admin.StackedInline):

    model = App
