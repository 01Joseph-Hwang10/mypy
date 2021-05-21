import jwt
# import subprocess
import json
import os
import shutil
from zipfile import ZipFile
from PIL import Image
from apps.constants import OUTPUT_TYPES
from apps.functions import (
    TYPES,
    detect_main_function,
    extract_recursively,
    filter_banned_codeline,
    input_to_sys_args,
    write_constants,
    write_docker_compose,
    write_dockerfile,
    write_flask_app
)
from common.pagination import ThreeFigurePagination
from rest_framework.parsers import MultiPartParser
# from common.functions import get_cookie
from config.settings import (
    ALGORITHM,
    DEBUG,
    MEDIA_ROOT,
    SECRET_KEY,
    SERVER_NUMBER,
    STATICFILES_DIRS,
    STATIC_ROOT
)
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    DestroyAPIView,
    UpdateAPIView,
    RetrieveAPIView
)
from rest_framework.response import Response
from apps.models import App, InputSpec
from apps.serializers import AppSerializer, InputSpecSerializer
from users.models import CustomUser
from apps.models import App
from apps.permissions import (
    AllowedToCreateApp,
    AllowedToModifyApp,
    AllowedToModifyInputSpec
)
from common.functions import get_cookie
from users.serializers import LightWeightUserSerializer
import requests
from time import sleep


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
            cover_img_source = post_data['cover_img']
            output_type = post_data['output_type']
            if cover_img_source == 'undefined':
                cover_img_source = False

            # Check if user exceeded the maximum app limit
            count_app = created_by.myapp.count()
            if count_app > 1:
                raise BufferError(
                    'You exceeded the maximum limit of the number of apps.')

            # Defines port number
            max_port_app = App.objects.order_by('-port').first()
            if max_port_app == None:
                new_port = 10000
            else:
                new_port = int(max_port_app.port) + 1

            # Check whether output type is proper
            if output_type not in OUTPUT_TYPES:
                raise ValueError('Not a valid output type!')

            # Initially create Instance
            new = App.objects.create(
                name=name,
                description=description,
                created_by=created_by,
                app='',
                cover_img=None,
                # For temporary
                server_number=1,
                port=new_port,
                output_type=output_type
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
            index_directory = os.path.join(script_directory, 'index.py')
            # Read code
            with open(os.path.join(script_directory, 'index.py'), 'r') as f:
                codelines = f.readlines()
            # Modify code
            with open(os.path.join(script_directory, 'index.py'), 'w') as f:
                # f.write('import os\n')
                # f.write(
                #     f"with open('{os.path.join(save_directory,'input/__args.py')}', 'r') as f:\n")
                # f.write('    __code = f.read()\n')
                # f.write('exec(__code)\n')
                specs_list = []
                walking = True
                for codeline in codelines:
                    # modules = get_modules(dirs)
                    if codeline.split(' ')[0] not in ['from', 'import'] and walking:
                        specs, converted = input_to_sys_args(
                            codeline, 'index.py')
                        if converted:
                            f.write(converted)
                        # Create Input Specs if it exists
                        for spec in specs:
                            InputSpec.objects.create(
                                name=f"{spec['name']}({spec['type']})",
                                variable_name=spec['name'],
                                description=spec['description'],
                                type=spec['type'],
                                app=App.objects.get(id=new_id)
                            )
                            specs_list.append(spec)
                        if codeline.split(' ')[0] == 'def':
                            walking = False
                    else:
                        f.write(codeline)
                files_count = 0
                for spec in specs_list:
                    if spec['type'] not in TYPES:
                        files_count += 1
                if files_count > 4:
                    raise BufferError(
                        'Number of file input should not exceed 3!!')
            with open(index_directory, 'r') as f:
                codelines = f.readlines()
            with open(index_directory, 'w') as f:
                to_inject = ['def main(__variables, __files):\n']
                for spec in specs_list:
                    spec_name = spec['name']
                    spec_type = spec['type']
                    if spec_type in TYPES:
                        new_line = f"\t{spec_name}={spec_type}(__variables['{spec_name}'])\n"
                    else:
                        new_line = f"\t{spec_name}=__files['{spec_name}']"
                    to_inject.append(new_line)
                for codeline in codelines:
                    if detect_main_function(codeline):
                        for injecting_codeline in to_inject:
                            f.write(injecting_codeline)
                    else:
                        f.write(codeline)

            for file_path in py_dirs:
                with open(os.path.join(script_directory, file_path), 'r') as f:
                    codelines = f.readlines()
                with open(os.path.join(script_directory, file_path), 'w') as f:
                    for codeline in codelines:
                        new_codeline = filter_banned_codeline(codeline)
                        if new_codeline:
                            f.write(new_codeline)

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
            # log_dir = os.path.join(save_directory, 'log')
            # input_dir = os.path.join(save_directory, 'input')
            # output_dir = os.path.join(save_directory, 'output')
            # data_dir = os.path.join(save_directory, 'data')
            # Make sure to support dependencies installation with requirements.txt
            # dependencies_dir = os.path.join(script_directory, '__dependencies')
            # server_dependencies_dir = os.path.join(
            #     save_directory, 'dependencies')
            # os.mkdir(log_dir)
            # os.mkdir(input_dir)
            # os.mkdir(output_dir)
            # os.mkdir(data_dir)

            # Make __args.py which will be base of inputs
            # if DEBUG:
            #     args_script = os.path.join(STATICFILES_DIRS[0], '__args.py')
            # else:
            #     args_script = os.path.join(STATIC_ROOT, '__args.py')
            # shutil.copy(args_script, input_dir)

            # Check if there is requirements.txt file
            requirements_path = os.path.join(
                script_directory, 'requirements.txt')
            if os.path.isfile(requirements_path):
                has_dependencies = True
                new_requirements_path = os.path.join(
                    save_directory, 'requirements.txt')
                shutil.move(requirements_path, new_requirements_path)
            else:
                has_dependencies = False

            # Make flask app
            with open(os.path.join(script_directory, '__app.py'), 'w') as f:
                write_flask_app(f, name, output_type)

            # Make constants
            with open(os.path.join(script_directory, '__constants.py'), 'w') as f:
                write_constants(f)

            # Modularize server folder
            with open(os.path.join(server_directory, '__init__.py'), 'w') as f:
                pass
            with open(os.path.join(script_directory, '__init__.py'), 'w') as f:
                pass

            # Make api Dockerfile
            with open(os.path.join(server_directory, 'Dockerfile'), 'w') as f:
                write_dockerfile(f, output_type, has_dependencies)

            # Make docker-compose file
            with open(os.path.join(save_directory, 'docker-compose.yml'), 'w') as f:
                write_docker_compose(f, new_port, new_id)

            # sleep(30)

            # Zip app again
            zip_directory = os.path.join(save_directory, 'container.zip')
            with ZipFile(zip_directory, 'w') as zf:
                for folderName, subfolders, filenames in os.walk(save_directory):
                    for filename in filenames:
                        filePath = os.path.join(folderName, filename)
                        relativePath = filePath.replace(save_directory, '')
                        if filePath != 'container.zip':
                            zf.write(filePath, relativePath)

            with open(zip_directory, 'rb') as zf:
                server_url = 'http://localhost:5000/create/'  # Temporal
                app_spec = {
                    'id': new_id,
                    'name': name,
                    'port': new_port,
                    'output_type': output_type
                }
                request_data = {
                    'SECRET_KEY': SECRET_KEY,
                    'app_spec': json.dumps(app_spec)
                }
                result = requests.post(server_url, data=request_data, files={
                                       'app_source': ('app.zip', zf)})
                if result.status_code != 200:
                    raise BufferError('Deployment failed!')

            # Deploy the app
            # if DEBUG:
            #     subp = subprocess.Popen(
            #         ['docker-compose', 'up', '--build'], cwd=save_directory)
            # else:
            #     subp = subprocess.Popen(
            #         ['docker-compose', 'up', '--build', '-d'], cwd=save_directory)
            #     subp.wait()

            # Save cover image if there is cover image
            static_dir = os.path.join(save_directory, 'static')
            os.mkdir(static_dir)
            if cover_img_source:
                cover_img = Image.open(cover_img_source)
                img_extension = cover_img_source.name.split('.')[-1]
                cover_img_directory = os.path.join(
                    static_dir, f'cover_img.{img_extension}')
                cover_img_uri = f'/{new_id}/static/cover_img.{img_extension}'
                cover_img.save(cover_img_directory)
            else:
                cover_img_directory = False

            # Update initially created instance's app path and cover image path
            instance = App.objects.get(id=new_id)
            instance.app = save_directory
            if cover_img_directory:
                instance.cover_img = cover_img_uri
            instance.save()

            # Clean up
            shutil.rmtree(server_directory)
            os.remove(os.path.join(save_directory, 'docker-compose.yml'))
            os.remove(os.path.join(save_directory, 'container.zip'))

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
            return Response(status=400, data=json.dumps(str(e)))


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
        try:
            post_data = request.data
            app_id = int(post_data['id'])
            name = post_data['name']
            description = post_data['description']

            app = App.objects.filter(id=app_id)
            if not app:
                raise ValueError('App with this id does not exists')
            app = app[0]
            app.name = name
            app.description = description

            if json.loads(post_data['has_cover_img']):
                cover_img_source = post_data['cover_img']
                img_extension = cover_img_source.name.split('.')[-1]
                static_dir = os.path.join(MEDIA_ROOT, f'{app_id}/static')
                cover_img_directory = os.path.join(
                    static_dir, f'cover_img.{img_extension}')
                os.remove(cover_img_directory)
                cover_img = Image.open(cover_img_source)
                cover_img.save(cover_img_directory)

            app.save()

            return Response(status=200, data='app successfully updated')
        except Exception as e:
            print(e)
            return Response(status=400, data="app update failed!")


class UpdateInputSpecView(UpdateAPIView):

    queryset = InputSpec.objects.all()
    serializer_class = InputSpecSerializer
    permission_classes = (AllowedToModifyInputSpec,)

    def patch(self, request, *args, **kwargs):
        try:
            post_data = request.data
            input_spec_id = int(post_data['id'])
            name = post_data['name']
            description = post_data['description']

            input_spec = InputSpec.objects.filter(id=input_spec_id)
            print(input_spec)
            if not input_spec:
                raise ValueError('Input spec with this id does not exists')
            input_spec = input_spec[0]
            input_spec.name = name
            input_spec.description = description

            input_spec.save()

            return Response(status=200, data='app successfully updated')
        except Exception as e:
            print(e)
            return Response(status=400, data="app update failed!")


class DeleteAppView(DestroyAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer
    permission_classes = (AllowedToModifyApp,)

    def delete(self, request, *args, **kwargs):

        try:
            # Delete every source of app
            id = int(self.request.query_params.get('id'))
            save_directory = os.path.join(MEDIA_ROOT, f'{id}/')
            server_url = f'http://localhost:5000/delete/'
            # subp = subprocess.Popen(
            #     ['docker-compose', 'down'], cwd=save_directory
            # )
            # subp.wait()
            result = requests.post(
                server_url, data={'id': id, 'SECRET_KEY': SECRET_KEY})
            if result.status_code != 200:
                raise BufferError('Deletion failed!')
            shutil.rmtree(save_directory)
            App.objects.filter(id=id)[0].delete()
            return Response(status=200, data='app successfully deleted')
        except Exception as e:
            print(e)
            App.objects.filter(id=id)[0].delete()
            return Response(status=500, data='app deletation failed')
