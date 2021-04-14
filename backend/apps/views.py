import zipapp
import os
import shutil
import runpy
from zipfile import ZipFile
from apps.functions import extract_recursively, input_to_sys_args
from common.pagination import ThreeFigurePagination
from rest_framework.parsers import MultiPartParser
# from common.functions import get_cookie
from config.settings import MEDIA_ROOT, STATIC_ROOT
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from apps.models import App, InputSpec
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
            post_data = request.data
            user_id = int(post_data['user_id'])
            name = post_data['name']
            description = post_data['description']
            created_by = CustomUser.objects.get(id=user_id)
            new = App.objects.create(
                name=name,
                description=description,
                created_by=created_by,
                app='',
                static='',
            )
            new_id = int(self.get_serializer(new)['id'].value)
            save_directory = os.path.join(MEDIA_ROOT, f'{new_id}/')
            app_source = post_data['app']
            with ZipFile(app_source) as zf:
                dirs = zf.namelist()
                extract_recursively('', zf.namelist(), zf, save_directory)
            root_name = os.listdir(save_directory)[0]
            app_path = os.path.join(save_directory, f'{root_name}.pyz')
            root_directory = os.path.join(save_directory, root_name)
            main_script = os.path.join(STATIC_ROOT, '__main__.py')
            py_dirs = []
            for item in dirs:
                if item[-3] + item[-2] + item[-1] == '.py':
                    py_dirs.append(item)
            for file_path in py_dirs:
                with open(os.path.join(save_directory, file_path), 'r') as f:
                    codelines = f.readlines()
                # codelines = [codeline[:-1] for codeline in codelines]
                # codelines = list(filter(lambda x: len(x) != 0, codelines))
                with open(os.path.join(save_directory, file_path), 'w') as f:
                    f.write('import sys\n')
                    for codeline in codelines:
                        specs, converted = input_to_sys_args(codeline)
                        f.write(converted)
                for spec in specs:
                    InputSpec.objects.create(
                        name=spec['name'],
                        description=spec['description'],
                        # type = spec['type'],
                        app=App.objects.get(id=new_id)
                    )
            # app_path = os.path.join(save_directory, f'{root_name}.zip')
            # with ZipFile(os.path.join(save_directory, app_path), 'w') as zf:
            #     for folder, subfolders, files in os.walk(save_directory):
            #         for file in files:
            #             zf.write(os.path.join(folder, file), os.path.relpath(
            #                 os.path.join(folder, file), save_directory))
            shutil.copy(main_script, root_directory)
            zipapp.create_archive(root_directory)
            shutil.rmtree(root_directory)
            instance = App.objects.get(id=new_id)
            instance.app = app_path
            instance.save()
            return Response(status=201, data='Successfully created app')
        except Exception:
            shutil.rmtree(save_directory)
            return Response(status=400, data='Failed creating app')


class ListAppView(ListAPIView):

    queryset = App.objects.all().order_by('-updated')
    serializer_class = AppSerializer
    pagination_class = ThreeFigurePagination


class RetrieveAppView(RetrieveAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def get(self, request, *args, **kwargs):

        try:
            id = int(self.request.query_params.get('id'))
            app = App.objects.get(id=id)
            result = AppSerializer(app).data
            return Response(status=200, data=result)
        except Exception:
            return Response(status=500, data='Internal Server Error')


class ExecuteAppView(CreateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def post(self, request, *args, **kwargs):

        # try:
        post_data = request.data
        user_id = post_data['user_id']
        app_path = post_data['app']
        variables = post_data['variables']
        app_run = runpy.run_path(app_path)
        root_path = os.path.join(MEDIA_ROOT, f'{user_id}/')
        result, log = app_run['execute'](variables, root_path)
        # What you need to do:
        # Mock static fileSystem
        # Check if sys.argv is shared among apps uploaded -> They share one sys.argv
        return Response(status=200, data={'result': result, 'log': log})
        # except Exception:
        # Delete all files uploaded
        # return Response(status=500, data='Internal server error')


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
        id = int(self.request.query_params.get('id'))
        shutil.rmtree(os.path.join(MEDIA_ROOT, f'{id}/'))
        self.destroy(request, *args, **kwargs)
        return Response(status=200, data='app successfully deleted')
