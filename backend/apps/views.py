import zipapp
import time
import jwt
import subprocess
import json
import os
import shutil
import runpy
from zipfile import ZipFile
from PIL import Image
from apps.functions import detect_main_function, extract_recursively, get_modules, replace_with_appropriates, write_docker_compose, write_dockerfile, write_flask_app
from common.pagination import ThreeFigurePagination
from rest_framework.parsers import MultiPartParser
# from common.functions import get_cookie
from config.settings import ALGORITHM, DEBUG, MEDIA_ROOT, SECRET_KEY, SERVER_NUMBER, STATICFILES_DIRS, STATIC_ROOT
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from apps.models import App, InputSpec
from apps.serializers import AppSerializer, InputSpecSerializer
from users.models import CustomUser
from apps.models import App
from apps.permissions import AllowedToCreateApp, AllowedToModifyApp
from common.functions import decode_token, get_cookie
from users.serializers import LightWeightUserSerializer


class CreateAppView(CreateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = (AllowedToCreateApp,)

    def post(self, request, *args, **kwargs):
        try:
            # Initialize
            save_directory = False
            new_id = False

            # Gets cookie
            cookie = get_cookie(request)
            access_token = cookie['access_token']
            decoded_token = jwt.decode(
                jwt=access_token, key=SECRET_KEY, algorithms=ALGORITHM)
            user_id = decoded_token['user_id']

            # Recieves input
            post_data = request.data
            name = post_data['name']
            description = post_data['description']
            created_by = CustomUser.objects.get(id=user_id)
            app_source = post_data['app']
            has_file_input = json.loads(post_data['has_file_input'])
            cover_img_source = post_data['cover_img']
            if cover_img_source == 'undefined':
                cover_img_source = False

            # Defines port number
            max_port_app = App.objects.order_by('-port').first()
            if max_port_app == None:
                new_port = 10000
            else:
                new_port = int(max_port_app.port) + 1

            # Initially create Instance
            new = App.objects.create(
                name=name,
                description=description,
                created_by=created_by,
                app='',
                cover_img=None,
                has_file_input=has_file_input,
                server_number=SERVER_NUMBER,
                port=new_port
            )

            # Get Id out of it
            new_id = int(self.get_serializer(new)['id'].value)

            # Make media root if not exist
            if not os.path.exists(MEDIA_ROOT):
                os.mkdir(MEDIA_ROOT)

            # Set save directory by id
            save_directory = os.path.join(MEDIA_ROOT, f'{new_id}/')
            os.mkdir(save_directory)

            # Make server folder
            server_directory = os.path.join(save_directory, 'server/')
            os.mkdir(server_directory)

            # Extract given zipfile recursively
            with ZipFile(app_source) as zf:
                dirs = zf.namelist()
                extract_recursively('', dirs, zf, server_directory)

            # Get root name of the app
            root_name = os.listdir(server_directory)[0]
            root_directory = os.path.join(server_directory, root_name)

            # Rename extracted folder to 'app'
            script_directory = os.path.join(server_directory, 'app/')
            os.rename(root_directory, script_directory)

            # Collect python script path for modification

            py_dirs = []
            new_dirs = []
            # Delete root_name on paths in dirs
            for path in dirs:
                levels = path.split('/')
                del levels[0]
                new_path = '/'.join(levels)
                new_dirs.append(new_path)

            # Sorting python script files
            for item in new_dirs:
                if len(item) > 3 and item[-3] + item[-2] + item[-1] == '.py':
                    py_dirs.append(item)

            # Modify codes
            for file_path in py_dirs:
                # Read code
                with open(os.path.join(script_directory, file_path), 'r') as f:
                    codelines = f.readlines()
                # Modify code
                with open(os.path.join(script_directory, file_path), 'w') as f:
                    # f.write('import os\n')
                    # f.write(
                    #     f"with open('{os.path.join(save_directory,'input/__args.py')}', 'r') as f:\n")
                    # f.write('    __code = f.read()\n')
                    # f.write('exec(__code)\n')
                    specs_list = []
                    for codeline in codelines:
                        # modules = get_modules(dirs)
                        specs, converted = replace_with_appropriates(
                            codeline, file_path)
                        if converted:
                            f.write(converted)
                        # Create Input Specs if it exists
                        for spec in specs:
                            InputSpec.objects.create(
                                name=spec['name'],
                                description=spec['description'],
                                type=spec['type'],
                                app=App.objects.get(id=new_id)
                            )
                            specs_list.append(spec)
            index_directory = os.path.join(script_directory, 'index.py')
            with open(index_directory, 'r') as f:
                codelines = f.readlines()
            with open(index_directory, 'w') as f:
                to_inject = ['def main(__global_vars):\n']
                for spec in specs_list:
                    spec_name = spec['name']
                    spec_type = spec['type']
                    new_line = f"\t{spec_name}={spec_type}(__global_vars['{spec_name}'])\n"
                    to_inject.append(new_line)
                for codeline in codelines:
                    if detect_main_function(codeline):
                        for injecting_codeline in to_inject:
                            f.write(injecting_codeline)
                    else:
                        f.write(codeline)

            """
            app_path = os.path.join(save_directory, f'{root_name}.zip')
            with ZipFile(os.path.join(save_directory, app_path), 'w') as zf:
                for folder, subfolders, files in os.walk(save_directory):
                    for file in files:
                        zf.write(os.path.join(folder, file), os.path.relpath(
                            os.path.join(folder, file), save_directory))
            """
            # Create __main__.py
            # if DEBUG:
            #     main_script = os.path.join(STATICFILES_DIRS[0], '__main__.py')
            # else:
            #     main_script = os.path.join(STATIC_ROOT, '__main__.py')
            # shutil.copy(main_script, script_directory)

            # Change index.py to have its app's id included on it
            # old_index_name = os.path.join(script_directory, 'index.py')
            # new_index_name = os.path.join(
            #     script_directory, f'index{new_id}.py')
            # os.rename(old_index_name, new_index_name)

            # Write __main__.py with importing index file whose name has id of its app
            if DEBUG:
                main_source = os.path.join(STATICFILES_DIRS[0], 'main.py')
            else:
                main_source = os.path.join(STATIC_ROOT, 'main.py')
            # Read main.py
            with open(main_source, 'r') as f:
                codelines = f.readlines()
            # Modify __main__.py
            with open(os.path.join(script_directory, '__main.py'), 'w') as f:
                # f.write(f'from index{new_id} import main\n')
                for codeline in codelines:
                    f.write(codeline)  # \n already exists

            # Create .pyz file
            # zipapp.create_archive(script_directory)

            # Remove app source which is not zipped
            # shutil.rmtree(script_directory)

            # Make folders which will used on execution
            log_dir = os.path.join(save_directory, 'log')
            input_dir = os.path.join(save_directory, 'input')
            output_dir = os.path.join(save_directory, 'output')
            data_dir = os.path.join(save_directory, 'data')
            static_dir = os.path.join(save_directory, 'static')
            # Make sure to support dependencies installation with requirements.txt
            dependencies_dir = os.path.join(script_directory, '__dependencies')
            server_dependencies_dir = os.path.join(
                save_directory, 'dependencies')
            os.mkdir(log_dir)
            os.mkdir(input_dir)
            os.mkdir(output_dir)
            os.mkdir(data_dir)
            os.mkdir(static_dir)

            # Save cover image if there is cover image
            if cover_img_source:
                cover_img = Image.open(cover_img_source)
                cover_img_directory = os.path.join(static_dir, 'cover_img')
                cover_img.save(cover_img_directory)
            else:
                cover_img_directory = False

            # Make __args.py which will be base of inputs
            if DEBUG:
                args_script = os.path.join(STATICFILES_DIRS[0], '__args.py')
            else:
                args_script = os.path.join(STATIC_ROOT, '__args.py')
            shutil.copy(args_script, input_dir)

            # Make flask app
            with open(os.path.join(script_directory, 'app.py'), 'w') as f:
                log_file_directory = os.path.join(log_dir, 'log.txt')
                write_flask_app(f, name, log_file_directory)

            # Modularize server folder
            with open(os.path.join(server_directory, '__init__.py'), 'w') as f:
                pass
            with open(os.path.join(script_directory, '__init__.py'), 'w') as f:
                pass

            # Make api Dockerfile
            with open(os.path.join(server_directory, 'Dockerfile'), 'w') as f:
                write_dockerfile(f)

            # Make docker-compose file
            with open(os.path.join(save_directory, 'docker-compose.yml'), 'w') as f:
                write_docker_compose(f, new_port)

            # Deploy the app
            subp = subprocess.Popen(
                ['docker-compose', 'up', '--build', '-d'], cwd=save_directory)
            subp.wait()

            # Update initially created instance's app path and cover image path
            instance = App.objects.get(id=new_id)
            instance.app = save_directory
            if cover_img_directory:
                instance.cover_img = cover_img_directory
            instance.save()

            # Return id which will be used at retrieve on frontend
            data = {
                'message': 'Successfully created app',
                'id': new_id
            }
            return Response(status=201, data=data)
        except Exception as e:
            print(e)

            # Delete all files uploaded and instance if creation failed
            if save_directory:
                shutil.rmtree(save_directory)
            if new_id:
                App.objects.filter(id=new_id).delete()
            return Response(status=400, data='Failed creating app')


class ListAppView(ListAPIView):

    queryset = App.objects.all().order_by('-updated')
    serializer_class = AppSerializer
    pagination_class = ThreeFigurePagination


class SelectedListAppView(CreateAPIView):

    serializer_class = AppSerializer

    def post(self, request, *args, **kwargs):
        try:
            post_data = request.data
            app_ids = json.loads(post_data['app_ids'])
            apps = App.objects.filter(id__in=app_ids)
            serialized = AppSerializer(apps, many=True)
            return Response(status=200, data=serialized.data)
        except Exception as e:
            print(e)
            return Response(status=500, data="Internal Server Error")


class RetrieveAppView(RetrieveAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def get(self, request, *args, **kwargs):

        try:
            # Get id and get app path, inputs by that
            id = int(self.request.query_params.get('id'))
            app_source = App.objects.get(id=id)
            app = AppSerializer(app_source).data
            inputs = InputSpecSerializer(
                app_source.input_spec.all(), many=True).data
            created_by = LightWeightUserSerializer(
                app_source.created_by).data

            # Return app path and inputs
            data = {
                'app': app,
                'inputs': inputs,
                'createdBy': created_by
            }
            return Response(status=200, data=data)
        except Exception as e:
            print(e)
            return Response(status=500, data='Internal Server Error')


class UpdateAppView(UpdateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer
    permission_classes = (AllowedToModifyApp,)

    def patch(self, request, *args, **kwargs):

        # Partial update
        return Response(status=200, data='app successfully updated')


class DeleteAppView(DestroyAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer
    permission_classes = (AllowedToModifyApp,)

    def delete(self, request, *args, **kwargs):

        try:
            # Delete every source of app
            id = int(self.request.query_params.get('id'))
            save_directory = os.path.join(MEDIA_ROOT, f'{id}/')
            subp = subprocess.Popen(
                ['docker-compose', 'down'], cwd=save_directory
            )
            subp.wait()
            shutil.rmtree(save_directory)
            App.objects.filter(id=id)[0].delete()
            return Response(status=200, data='app successfully deleted')
        except Exception as e:
            print(e)
            App.objects.filter(id=id)[0].delete()
            return Response(status=500, data='app deletation failed')
