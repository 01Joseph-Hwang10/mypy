from django.db import models
from django.db.models.fields import TextField
from common.models import TimeStampedModel


class FeedBack(TimeStampedModel):

    content = TextField()
