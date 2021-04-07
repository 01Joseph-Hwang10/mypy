import zipapp
import os
import shutil
from zipfile import ZipFile
from apps.functions import extract_recursively
from rest_framework.parsers import MultiPartParser
from common.functions import get_cookie
from config.settings import MEDIA_ROOT, STATIC_ROOT
from rest_framework import generics
from rest_framework.response import Response
from apps.models import App
from apps.serializers import AppSerializer
from users.models import CustomUser
from apps.models import App


class CreateAppView(generics.CreateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        try:
            # cookie = get_cookie(request)
            # user_id = cookie['user_id']
            # post_data = request.data
            post_data = request.data
            user_id = int(post_data['user_id'])
            name = post_data['name']
            description = post_data['description']
            app_source = post_data['app']
            created = CustomUser.objects.get(id=user_id)
            save_directory = os.path.join(MEDIA_ROOT, f'{user_id}/')
            with ZipFile(app_source) as zf:
                extract_recursively('', zf.namelist(), zf, save_directory)
            root_name = os.listdir(save_directory)[0]
            root_directory = os.path.join(save_directory, root_name)
            main_script = os.path.join(STATIC_ROOT, '__main__.py')
            shutil.copy(main_script, root_directory)
            zipapp.create_archive(root_directory)
            shutil.rmtree(root_directory)
            app = os.path.join(save_directory, f'{root_name}.pyz')
            App.objects.create(
                name=name,
                description=description,
                app=app,
                created=created,
            )
            return Response(status=201, data='Successfully created app')
        except Exception:
            shutil.rmtree(save_directory)
            return Response(status=400, data='Failed creating app')


# ListAppView
# RetrieveAppView
# UpdateAppView
# DeleteAppView
