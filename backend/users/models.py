from typing import AbstractSet
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    class Meta:
        abstract = False

    def my_apps(self):
        return self.myapp.all()
