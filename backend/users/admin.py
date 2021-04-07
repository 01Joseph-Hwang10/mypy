from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import CustomUser
from apps.admin import AppInline


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):

    inlines = (AppInline,)
