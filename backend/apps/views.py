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
from common.permissions import AllowedToCreateApp


class CreateAppView(CreateAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = (AllowedToCreateApp,)

    def post(self, request, *args, **kwargs):
        try:
            # Recieves input
            post_data = request.data
            user_id = int(post_data['user_id'])
            name = post_data['name']
            description = post_data['description']
            created_by = CustomUser.objects.get(id=user_id)
            app_source = post_data['app']

            # Initially create Instance
            new = App.objects.create(
                name=name,
                description=description,
                created_by=created_by,
                app='',
                static='',
            )

            # Get Id out of it
            new_id = int(self.get_serializer(new)['id'].value)

            # Set save directory by id
            save_directory = os.path.join(MEDIA_ROOT, f'{new_id}/')

            # Extract given zipfile recursively
            with ZipFile(app_source) as zf:
                dirs = zf.namelist()
                extract_recursively('', dirs, zf, save_directory)

            # Rename extracted folder to 'app'
            root_name = os.listdir(save_directory)[0]
            root_directory = os.path.join(save_directory, root_name)
            script_directory = os.path.join(save_directory, 'app/')
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
                    f.write('import os\n')
                    f.write(
                        f"with open('{os.path.join(save_directory,'input/__args.py')}', 'r') as f:\n")
                    f.write('    code = f.read()\n')
                    f.write('exec(code)\n')
                    for codeline in codelines:
                        specs, converted = replace_with_appropriates(codeline)
                        f.write(converted)
                        # Create Input Specs if it exists
                        for spec in specs:
                            InputSpec.objects.create(
                                name=spec['name'],
                                description=spec['description'],
                                type=spec['type'],
                                app=App.objects.get(id=new_id)
                            )
            """
            app_path = os.path.join(save_directory, f'{root_name}.zip')
            with ZipFile(os.path.join(save_directory, app_path), 'w') as zf:
                for folder, subfolders, files in os.walk(save_directory):
                    for file in files:
                        zf.write(os.path.join(folder, file), os.path.relpath(
                            os.path.join(folder, file), save_directory))
            """
            # Create __main__.py
            main_script = os.path.join(STATIC_ROOT, '__main__.py')
            shutil.copy(main_script, script_directory)

            # Change index.py to have its app's id included on it
            old_index_name = os.path.join(script_directory, 'index.py')
            new_index_name = os.path.join(
                script_directory, f'index{new_id}.py')
            os.rename(old_index_name, new_index_name)

            # Write __main__.py with importing index file whose name has id of its app
            main_source = os.path.join(STATIC_ROOT, 'main.py')
            # Read main.py
            with open(main_source, 'r') as f:
                codelines = f.readlines()
            # Modify __main__.py
            with open(os.path.join(script_directory, '__main__.py'), 'w') as f:
                f.write(f'from index{new_id} import main\n')
                for codeline in codelines:
                    f.write(codeline)  # \n already exists

            # Create .pyz file
            zipapp.create_archive(script_directory)

            # Remove app source which is not zipped
            shutil.rmtree(script_directory)

            # Make folders which will used on execution
            log_dir = os.path.join(save_directory, 'log')
            input_dir = os.path.join(save_directory, 'input')
            output_dir = os.path.join(save_directory, 'output')
            data_dir = os.path.join(save_directory, 'data')
            static_dir = os.path.join(save_directory, 'static')
            os.mkdir(log_dir)
            os.mkdir(input_dir)
            os.mkdir(output_dir)
            os.mkdir(data_dir)
            os.mkdir(static_dir)

            # Make __args.py which will be base of inputs
            args_script = os.path.join(STATIC_ROOT, '__args.py')
            shutil.copy(args_script, input_dir)

            # Update initially created instance's app path
            instance = App.objects.get(id=new_id)
            instance.app = save_directory
            instance.save()

            # Return id which will be used at retrieve on frontend
            data = {
                'message': 'Successfully created app',
                'id': new_id
            }
            return Response(status=201, data=data)
        except Exception:
            print(Exception)

            # Delete all files uploaded and instance if creation failed
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
            # Get id and get app path, inputs by that
            id = int(self.request.query_params.get('id'))
            app_source = App.objects.get(id=id)
            app = AppSerializer(app_source).data
            inputs = InputSpecSerializer(
                app_source.input_spec.all(), many=True).data

            # Return app path and inputs
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
            # Initially set for exception
            root_path = False

            # Get client inputs
            post_data = request.data
            app_path = post_data['app']
            variables = json.loads(post_data['variables'])
            files = post_data['files']

            # Make needed folders if not exist
            log_dir = os.path.join(app_path, 'log')
            input_dir = os.path.join(app_path, 'input')
            output_dir = os.path.join(app_path, 'output')
            data_dir = os.path.join(app_path, 'data')
            static_dir = os.path.join(app_path, 'static')
            if not os.path.exists(log_dir):
                os.mkdir(log_dir)
            if not os.path.exists(input_dir):
                os.mkdir(input_dir)
            if not os.path.exists(output_dir):
                os.mkdir(output_dir)
            if not os.path.exists(data_dir):
                os.mkdir(data_dir)
            if not os.path.exists(static_dir):
                os.mkdir(static_dir)

            # Modify __args.py and write the input from client
            input_path = os.path.join(app_path, 'input')
            args_path = os.path.join(input_path, '__args.py')
            with open(args_path, 'w') as f:
                f.write('__global_vars={\n')
                for key in list(variables.keys()):
                    if type(variables[key]) in [
                            type(str()), type(int()), type(float()), type(complex())]:
                        f.write(f"'{key}':{str(variables[key])},\n")
                    else:
                        f.write(f"'{key}':{variables[key]},\n")
                f.write('}\n')
                if files != 'false':
                    with ZipFile(files) as zf:
                        dirs = zf.namelist()
                        extract_recursively('', dirs, zf, input_path)
                    root_name = os.listdir(input_path)[0]
                    root_path = os.path.join(input_path, root_name)
                    f.write(f"__file_root='{root_path}'")

            # Execute app
            execute_path = os.path.join(app_path, 'app.pyz')
            app_run = runpy.run_path(execute_path)
            log_path = os.path.join(app_path, 'log')
            result, log = app_run['execute'](log_path)

            # Clean up
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
