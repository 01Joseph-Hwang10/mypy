from rest_framework.fields import EmailField
from rest_framework.serializers import Serializer
from rest_framework.serializers import IntegerField, CharField
from feedbacks.models import FeedBack


class FeedBackSerializer(Serializer):

    id = IntegerField()
    content = CharField()
    email = CharField(max_length=50)

    class Meta:
        model = FeedBack
        fields = '__all__'
