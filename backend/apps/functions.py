import os
from django.core.exceptions import ValidationError


def upload_to(instance, filename):
    return '%s/' % instance.created.user.id


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.zip', '.py']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')
