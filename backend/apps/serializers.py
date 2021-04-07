from rest_framework.serializers import PrimaryKeyRelatedField, HyperlinkedModelSerializer
from rest_framework import serializers
from apps.models import App


class AppSerializer(HyperlinkedModelSerializer):

    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=300)
    created = PrimaryKeyRelatedField(read_only=True)
    exports = serializers.IntegerField(required=False)
    app = serializers.CharField()
    static = serializers.CharField(required=False)

    class Meta:
        model = App
        fields = '__all__'
