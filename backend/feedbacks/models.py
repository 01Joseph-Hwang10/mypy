from django.db import models
from django.db.models.fields import CharField, TextField
from common.models import TimeStampedModel


class FeedBack(TimeStampedModel):

    email = CharField(max_length=50, default='anonymous')
    content = TextField()
