from django.db import models
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
    has_file_input = models.BooleanField(default=False)
    cover_img = models.TextField(null=True, default=True)
    server_number = models.IntegerField(default=SERVER_NUMBER)
    port = models.IntegerField()


class InputSpec(TimeStampedModel):

    STR = 'str'
    INT = 'int'
    FLOAT = 'float'
    COMPLEX = 'complex'
    LIST = 'list'
    TUPLE = 'tuple'
    RANGE = 'range'
    DICT = 'dict'
    SET = 'set'
    FROZENSET = 'frozenset'
    BOOL = 'bool'

    TYPES_CHOICES = (
        (STR, 'String'),
        (INT, 'Integer'),
        (FLOAT, 'Float'),
        (COMPLEX, 'Complex Number'),
        (LIST, 'List'),
        (TUPLE, 'Tuple'),
        (RANGE, 'Range'),
        (DICT, 'Dictionary'),
        (SET, 'Set'),
        (FROZENSET, 'Frozenset'),
        (BOOL, 'Boolean'),
    )

    app = models.ForeignKey(App, on_delete=models.CASCADE,
                            related_name='input_spec')
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    type = models.CharField('type', choices=TYPES_CHOICES,
                            default=STR, max_length=20)
