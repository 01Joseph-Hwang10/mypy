from django.contrib.auth.models import AbstractUser
from django.db.models import ManyToManyField


class CustomUser(AbstractUser):

    imported = ManyToManyField(
        'apps.App', related_name='user', blank=True)

    class Meta:
        abstract = False

    def my_apps(self):
        return self.myapp.all()
