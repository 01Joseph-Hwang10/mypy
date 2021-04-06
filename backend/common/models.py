from django.db import models


class TimeStampedModel(models.Model):

    """ Trace created time and updated time """

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
