from rest_framework.serializers import (
    PrimaryKeyRelatedField,
    Serializer,
    IntegerField,
    CharField,
    EmailField
)
# from rest_framework import serializers
from users.models import CustomUser


class CustomUserSerializer(Serializer):

    id = IntegerField()
    first_name = CharField()
    email = EmailField()
    my_apps = PrimaryKeyRelatedField(
        many=True, read_only=True, required=False)
    imported = PrimaryKeyRelatedField(
        many=True, read_only=True, required=False
    )
    bio = CharField(required=False)

    class Meta:
        model = CustomUser
        fields = '__all__'
