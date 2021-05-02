from feedbacks.models import FeedBack
from feedbacks.serializer import FeedBackSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response


class CreateFeedBackView(CreateAPIView):

    queryset = FeedBack.objects.all()
    serializer_class = FeedBackSerializer

    def post(self, request, *args, **kwargs):
        try:
            post_data = request.data
            content = post_data['content']
            FeedBack.objects.create(content=content)
            return Response(status=200, data="Feedback successfully recieved")
        except Exception as e:
            print(e)
            return Response(status=400, data="Feedback submit failed! Sorry for inconvenience")
