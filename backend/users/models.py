from django.contrib.auth.models import AbstractUser
from django.db.models import ManyToManyField, TextField
from django.db.models.fields import CharField
from users.constants import EMAIL, LOGIN_METHOD


class CustomUser(AbstractUser):

    imported = ManyToManyField(
        'apps.App', related_name='user', blank=True)
    bio = TextField(null=True, blank=True)
    login_method = CharField(
        'login_method', max_length=20, choices=LOGIN_METHOD, default=EMAIL)

    class Meta:
        abstract = False

    def my_apps(self):
        return self.myapp.all()

    def count_apps(self):
        return int(self.myapp.count())
