from rest_framework.serializers import PrimaryKeyRelatedField, Serializer
from rest_framework import serializers
from apps.models import App, InputSpec


class AppSerializer(Serializer):

    id = serializers.IntegerField()
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=300)
    created_by_id = PrimaryKeyRelatedField(read_only=True)
    exports = serializers.IntegerField(required=False)
    app = serializers.CharField(required=False)
    cover_img = serializers.ImageField(required=False)
    server_number = serializers.IntegerField()
    port = serializers.IntegerField()
    output_type = serializers.CharField(max_length=20)

    class Meta:
        model = App
        fields = '__all__'


class InputSpecSerializer(Serializer):

    id = serializers.IntegerField()
    app = serializers.CharField()
    name = serializers.CharField(max_length=200)
    description = serializers.CharField()
    type = serializers.CharField(max_length=20)

    class Meta:
        model = InputSpec
        fields = '__all__'
