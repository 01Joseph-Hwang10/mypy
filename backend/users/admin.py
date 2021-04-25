from django.contrib import admin
from django.contrib.admin import StackedInline
from django.contrib.auth.admin import UserAdmin
from users.models import CustomUser
from apps.admin import AppInline


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):

    inlines = (AppInline,)

    list_filter = UserAdmin.list_filter

    fieldsets = UserAdmin.fieldsets + (
        (
            'Mypy', {
                'fields': (
                    'imported',
                )
            }
        ),
        (
            'Additional Info', {
                'fields': (
                    'bio',
                )
            }
        ),
    )
