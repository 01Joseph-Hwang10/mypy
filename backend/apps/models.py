from django.db import models
from common.models import TimeStampedModel
from users.models import CustomUser


class App(TimeStampedModel):

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300, null=True, blank=True)
    app = models.TextField()
    static = models.TextField(null=True, blank=True)
    created = models.ForeignKey(
        CustomUser, related_name='myapp', on_delete=models.CASCADE)
    exports = models.IntegerField(default=0)
