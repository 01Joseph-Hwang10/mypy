from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from apps.models import App


class UpdateImportsView(UpdateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def partial_update(self, request, *args, **kwargs):
        try:
            post_data = request.data
            user_id = post_data['user_id']
            is_adding = post_data['isAdding']
            app_id = post_data['id']
            user = CustomUser.objects.get(id=user_id)
            if is_adding == 'true':
                user.imported.add(app_id)
            else:
                user.imported.remove(app_id)
            return Response(status=200, data='Update was successful')
        except Exception:
            return Response(status=400, data='Update failed')


class RetrieveUserView(RetrieveAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
