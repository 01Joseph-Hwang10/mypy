import zipapp
import os
import shutil
from zipfile import ZipFile
from apps.functions import extract_recursively
from common.pagination import ThreeFigurePagination
from rest_framework.parsers import MultiPartParser
from common.functions import get_cookie
from config.settings import MEDIA_ROOT, STATIC_ROOT
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from apps.models import App
from apps.serializers import AppSerializer
from users.models import CustomUser
from apps.models import App


class CreateAppView(CreateAPIView):

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


class ListAppView(ListAPIView):

    queryset = App.objects.all().order_by('-updated')
    serializer_class = AppSerializer
    pagination_class = ThreeFigurePagination


class RetrieveAppView(CreateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def post(self, request, *args, **kwargs):

        # Send the app file
        return Response(status=200, data='app successfully retrieved')


class UpdateAppView(UpdateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def patch(self, request, *args, **kwargs):

        # Partial update
        return Response(status=200, data='app successfully updated')


class DeleteAppView(DestroyAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def delete(self, request, *args, **kwargs):

        # Delete every source of app
        self.destroy(request, *args, **kwargs)
        return Response(status=200, data='app successfully deleted')
