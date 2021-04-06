import zipapp
import runpy
import zipfile
import os
from common.functions import get_cookie
from config.settings import MEDIA_ROOT
from rest_framework import generics, status
from rest_framework.response import Response
from apps.models import App
from apps.serializers import AppSerializer
from users.models import CustomUser


class CreateAppView(generics.CreateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def post(self, request, *args, **kwargs):
        try:
            cookie = get_cookie(request)
            user_id = cookie['user_id']
            post_data = request.data
            name = post_data['name']
            description = post_data['description']
            app_source = post_data['app']
            created = CustomUser.objects.get(id=post_data['created'])
            exports = 0
            with zipfile.ZipFile(app_source, 'r') as zip_ref:  # r, w, a, x
                zip_ref.extractall(os.path.join(MEDIA_ROOT, f'{user_id}/'))
        except Exception:
            return Response(status=400, data='Failed creating app')
