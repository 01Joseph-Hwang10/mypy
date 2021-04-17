import zipapp
import json
import os
import shutil
import runpy
from zipfile import ZipFile
from apps.functions import extract_recursively, replace_with_appropriates
from common.pagination import ThreeFigurePagination
from rest_framework.parsers import MultiPartParser
# from common.functions import get_cookie
from config.settings import MEDIA_ROOT, STATIC_ROOT
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from apps.models import App, InputSpec
from apps.serializers import AppSerializer, InputSpecSerializer
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
            script_directory = os.path.join(save_directory, 'app/')
            app_source = post_data['app']
            with ZipFile(app_source) as zf:
                dirs = zf.namelist()
                extract_recursively('', dirs, zf, save_directory)
            root_name = os.listdir(save_directory)[0]
            root_directory = os.path.join(save_directory, root_name)
            os.rename(root_directory, script_directory)
            py_dirs = []
            new_dirs = []
            for path in dirs:
                levels = path.split('/')
                del levels[0]
                new_path = '/'.join(levels)
                new_dirs.append(new_path)
            for item in new_dirs:
                if len(item) > 3 and item[-3] + item[-2] + item[-1] == '.py':
                    py_dirs.append(item)
            for file_path in py_dirs:
                with open(os.path.join(script_directory, file_path), 'r') as f:
                    codelines = f.readlines()
                # codelines = [codeline[:-1] for codeline in codelines]
                # codelines = list(filter(lambda x: len(x) != 0, codelines))
                with open(os.path.join(script_directory, file_path), 'w') as f:
                    f.write('import os\n')
                    f.write(
                        f"with open('{os.path.join(save_directory,'input/__args.py')}', 'r') as f:\n")
                    f.write('    code = f.read()\n')
                    f.write('exec(code)\n')
                    for codeline in codelines:
                        specs, converted = replace_with_appropriates(codeline)
                        f.write(converted)
                        for spec in specs:
                            InputSpec.objects.create(
                                name=spec['name'],
                                description=spec['description'],
                                type=spec['type'],
                                app=App.objects.get(id=new_id)
                            )
            # app_path = os.path.join(save_directory, f'{root_name}.zip')
            # with ZipFile(os.path.join(save_directory, app_path), 'w') as zf:
            #     for folder, subfolders, files in os.walk(save_directory):
            #         for file in files:
            #             zf.write(os.path.join(folder, file), os.path.relpath(
            #                 os.path.join(folder, file), save_directory))
            main_script = os.path.join(STATIC_ROOT, '__main__.py')
            main_source = os.path.join(STATIC_ROOT, 'main.py')
            args_script = os.path.join(STATIC_ROOT, '__args.py')
            log_dir = os.path.join(save_directory, 'log')
            input_dir = os.path.join(save_directory, 'input')
            output_dir = os.path.join(save_directory, 'output')
            data_dir = os.path.join(save_directory, 'data')
            shutil.copy(main_script, script_directory)
            old_index_name = os.path.join(script_directory, 'index.py')
            new_index_name = os.path.join(
                script_directory, f'index{new_id}.py')
            os.rename(old_index_name, new_index_name)
            with open(main_source, 'r') as f:
                codelines = f.readlines()
            with open(os.path.join(script_directory, '__main__.py'), 'w') as f:
                f.write(f'from index{new_id} import main\n')
                for codeline in codelines:
                    f.write(codeline)  # \n already exists
            zipapp.create_archive(script_directory)
            shutil.rmtree(script_directory)
            os.mkdir(log_dir)
            os.mkdir(input_dir)
            os.mkdir(output_dir)
            os.mkdir(data_dir)
            shutil.copy(args_script, input_dir)
            instance = App.objects.get(id=new_id)
            instance.app = save_directory
            instance.save()
            data = {
                'message': 'Successfully created app',
                'id': new_id
            }
            return Response(status=201, data=data)
        except Exception:
            shutil.rmtree(save_directory)
            if new_id:
                App.objects.filter(id=new_id).delete()
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
            app_source = App.objects.get(id=id)
            app = AppSerializer(app_source).data
            inputs = InputSpecSerializer(
                app_source.input_spec.all(), many=True).data
            data = {
                'app': app,
                'inputs': inputs
            }
            return Response(status=200, data=data)
        except Exception:
            return Response(status=500, data='Internal Server Error')


class ExecuteAppView(CreateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def post(self, request, *args, **kwargs):

        try:
            root_path = False
            post_data = request.data
            app_path = post_data['app']
            variables = json.loads(post_data['variables'])
            files = post_data['files']
            input_path = os.path.join(app_path, 'input')
            args_path = os.path.join(input_path, '__args.py')
            with open(args_path, 'w') as f:
                f.write('__global_vars={\n')
                for key in list(variables.keys()):
                    f.write(f"'{key}':'{variables[key]}',\n")
                f.write('}\n')
                if files != 'false':
                    with ZipFile(files) as zf:
                        dirs = zf.namelist()
                        extract_recursively('', dirs, zf, input_path)
                    root_name = os.listdir(input_path)[0]
                    root_path = os.path.join(input_path, root_name)
                    f.write(f"__file_root='{root_path}'")
            execute_path = os.path.join(app_path, 'app.pyz')
            app_run = runpy.run_path(execute_path)
            log_path = os.path.join(app_path, 'log')
            result, log = app_run['execute'](log_path)
            if not result:
                result = 'No return value made'
            if root_path:
                shutil.rmtree(root_path)
            # What you need to do:
            # Mock static fileSystem
            return Response(status=200, data={'result': result, 'log': log})
        except Exception:
            # Delete all files uploaded
            print(Exception)
            if root_path:
                shutil.rmtree(root_path)
            return Response(status=500, data='Internal server error')


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

        try:
            # Delete every source of app
            id = int(self.request.query_params.get('id'))
            shutil.rmtree(os.path.join(MEDIA_ROOT, f'{id}/'))
            App.objects.filter(id=id).delete()
            return Response(status=200, data='app successfully deleted')
        except Exception:
            return Response(status=500, data='app deletation failed')
