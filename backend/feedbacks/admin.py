from django.contrib import admin
from django.contrib.admin import ModelAdmin
from feedbacks.models import FeedBack


@admin.register(FeedBack)
class FeedBackAdmin(ModelAdmin):

    list_display = (
        'content',
        'created',
    )
