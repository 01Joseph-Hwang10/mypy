from django.db import models
from apps.constants import INPUT_EXTRATYPES, JSON, OUTPUT_TYPES_CHOICES
from common.models import TimeStampedModel
from config.settings import SERVER_NUMBER
from users.models import CustomUser


class App(TimeStampedModel):

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300, null=True, blank=True)
    app = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(
        CustomUser, related_name='myapp', on_delete=models.CASCADE)
    exports = models.IntegerField(default=0)
    cover_img = models.TextField(null=True, default=True)
    server_number = models.IntegerField(default=SERVER_NUMBER)
    port = models.IntegerField()
    output_type = models.CharField(
        'output_type', choices=OUTPUT_TYPES_CHOICES, default=JSON, max_length=30)


class InputSpec(TimeStampedModel):

    app = models.ForeignKey(App, on_delete=models.CASCADE,
                            related_name='input_spec')
    name = models.CharField(max_length=200)
    variable_name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=20)
    extra_type = models.CharField(
        'extra_type', choices=INPUT_EXTRATYPES, null=True, blank=True, max_length=30)
