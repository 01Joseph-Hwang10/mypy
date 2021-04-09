from rest_framework.serializers import PrimaryKeyRelatedField, Serializer
# from rest_framework import serializers
from users.models import CustomUser


class CustomUserSerializer(Serializer):

    my_apps = PrimaryKeyRelatedField(
        many=True, read_only=True, queryset=CustomUser.objects.all(), required=False)

    class Meta:
        model = CustomUser
        fields = '__all__'
