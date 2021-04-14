from rest_framework.serializers import PrimaryKeyRelatedField, Serializer
from rest_framework import serializers
from apps.models import App


class AppSerializer(Serializer):

    id = serializers.IntegerField()
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=300)
    created_by = PrimaryKeyRelatedField(read_only=True)
    exports = serializers.IntegerField(required=False)
    app = serializers.CharField(required=False)
    static = serializers.CharField(required=False)
    get_inputs = serializers.ListField(required=False)

    class Meta:
        model = App
        fields = '__all__'
