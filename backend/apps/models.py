from django.db import models
from users.models import CustomUser
from apps.functions import upload_to


class App(models.Model):

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    app = models.FileField(upload_to=upload_to)
    created = models.ForeignKey(CustomUser, related_name='myapp')
    exports = models.IntegerField(default=0)
