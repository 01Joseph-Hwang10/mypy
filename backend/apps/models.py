from django.db import models
from common.models import TimeStampedModel
from users.models import CustomUser
from apps.functions import upload_to


class App(TimeStampedModel):

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    app = models.FileField(upload_to=upload_to)
    created = models.ForeignKey(
        CustomUser, related_name='myapp', on_delete=models.CASCADE)
    exports = models.IntegerField(default=0)
