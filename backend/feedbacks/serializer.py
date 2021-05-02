from rest_framework.serializers import Serializer
from rest_framework.serializers import IntegerField, CharField
from feedbacks.models import FeedBack


class FeedBackSerializer(Serializer):

    id = IntegerField()
    content = CharField()

    class Meta:
        model = FeedBack
        fields = '__all__'
