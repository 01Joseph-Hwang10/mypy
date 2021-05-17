import os
from os.path import split
import re
from django.core.exceptions import ValidationError
from apps.constants import BANNED_EXTENSIONS, JPG, MD, PNG, STATIC_PATH, TYPES
from config.settings import DEBUG, STATICFILES_DIRS, STATIC_ROOT


def upload_to(instance, filename):
    return '%s/' % instance.created.user.id


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.zip', '.py']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')


def extract_recursively(basename, namelist, interface, save_directory):
    for name in namelist:
        full_name = basename + name
        if os.path.isdir(full_name):
            if full_name[-1] != '/':
                full_name += '/'
            with interface.open(full_name) as folder:
                new_namelist = os.listdir(folder.name)
                extract_recursively(folder.name, new_namelist, interface)
        else:
            interface.extract(full_name, save_directory + basename)


def input_to_sys_args(codeline, file_path):

    if file_path == 'index.py':
        code = str(codeline).replace(' ', '').replace(
            '\t', '').replace('\n', '')

        for i in range(len(code)):

            if code[i] == '#':
                code = code[:i]

        spec = code.split('=')
        if len(spec) == 2:
            variable_name = spec[0]
            variable_type = spec[1][:-2]
            if variable_type in TYPES:
                input_spec = {
                    'name': variable_name,
                    'description': f'Please give the input with type of "{variable_type}"',
                    'type': variable_type
                }
                return [input_spec], False
            else:
                variable_type = [s for s in spec[1][1:-1].split(',')]
                file_types = ''
                initial = True
                for file_type in variable_type:
                    if file_type[0] == '.':
                        initial = False
                        if file_type[1:] not in BANNED_EXTENSIONS:
                            file_types = file_types + f', {file_type}'
                    else:
                        break
                if len(file_types) == 0 and initial:
                    return [], codeline
                else:
                    file_types = file_types[2:]
                    input_spec = {
                        'name': variable_name,
                        'descripiton': f'Please give the input with type of "{file_types}"',
                        'type': file_types
                    }
                    return [input_spec], False

    return [], codeline


def detect_main_function(codeline):

    splitted = codeline.split()

    if len(splitted) == 2 and splitted == ['def', 'main():']:
        return True

    if len(splitted) == 3:
        if splitted == ['def', 'main()', ':'] or splitted == ['def', 'main(', '):'] or splitted == ['def', 'main', '():']:
            return True

    if len(splitted) == 4:
        if splitted == ['def', 'main(', ')', ':'] or splitted == ['def', 'main', '(', '):'] or splitted == ['def', 'main', '()', ':']:
            return True

    if len(splitted) == 5 and splitted == ['def', 'main', '(', ')', ':']:
        return True

    return False


def get_modules(dirs):

    modules = []

    for dir in dirs:
        splitted = dir.split('/')
        del splitted[0]
        modules.append('.'.join(splitted))

    return modules


# Support relative import feature later
def import_from_dependencies(codeline):

    splitted_codeline = codeline.split()
    if DEBUG:
        builtins_list_path = os.path.join(
            STATICFILES_DIRS[0], 'src/python_built_in_module_list.txt')
    else:
        builtins_list_path = os.path.join(
            STATIC_ROOT, 'src/python_built_in_module_list.txt')

    with open(builtins_list_path, 'r') as f:
        builtins_list_raw = f.readlines()
        builtins_list = []
        for builtin in builtins_list_raw:
            if len(builtin) > 0:
                builtins_list.append(builtin[:-2])

    if splitted_codeline[0] == 'from' and splitted_codeline[2] == 'import' and codeline[:5] == 'from ' and codeline[5] != ' ':
        if splitted_codeline[1] not in builtins_list:
            splitted_codeline[1] = f'__dependencies.{splitted_codeline[1]}'
            return ' '.join(splitted_codeline)

    if splitted_codeline[0] == 'import' and splitted_codeline[:7] == 'import ':
        if splitted_codeline[1] not in builtins_list:
            splitted_codeline[1] = f'__dependencies.{splitted_codeline[1]}'
            return ' '.join(splitted_codeline)

    return codeline


def filter_banned_syntax(codeline):

    banned = [
        {
            'syntax': 'argv',
            'exception': ['argv']
        },
        {
            'syntax': 'sys.argv',
            'exception': ['sys.argv']
        }
    ]

    for ban in banned:
        if re.search(ban['syntax'], codeline).value != 0:
            try:
                stripped = codeline.strip()
                parsed = stripped.split('=')
                if parsed[1] not in ban['exception']:
                    raise Exception
            except Exception:
                raise Exception


def filter_banned_codeline(codeline):

    banned_module = ['os', 'sys', 'subprocess', 'pathlib', 'tempfile']

    splitted_by_spaces = codeline.split()
    if len(splitted_by_spaces) != 0 and splitted_by_spaces[0] in ['from', 'import']:
        splitted_by_dots = splitted_by_spaces[1].split('.')
        if splitted_by_dots[0] in banned_module:
            return False

    return codeline


def replace_with_appropriates(codeline, file_path):

    # filter_banned_syntax(codeline)
    layer1 = input_to_sys_args(codeline, file_path)
    # layer2 = import_from_dependencies(layer1)
    result = layer1
    return result


def write_flask_app(interface, name, output_type):

    with open(os.path.join(STATIC_PATH, 'flask_server/server/app/__app.py'), 'r') as f:
        codelines = f.readlines()

    if output_type == MD:
        interface.write('from markdown import markdown\n')

    for codeline in codelines:
        new_codeline = codeline.replace('$NAME', str(
            name)).replace('$MIMETYPE', str(output_type))
        interface.write(new_codeline)
    interface.write('if __name__ == "__main__":\n')

    if DEBUG:
        interface.write('\tapp.run(debug=True)\n')
    else:
        interface.write('\tapp.run()\n')


def write_constants(interface):

    with open(os.path.join(STATIC_PATH, 'flask_server/server/app/__constants.py'), 'r') as f:
        codelines = f.read()
        interface.write(codelines)


def write_dockerfile(interface, output_type):

    with open(os.path.join(STATIC_PATH, 'flask_server/server/Dockerfile'), 'r') as f:
        codelines = f.readlines()

    for codeline in codelines:
        if output_type == MD:
            codeline = codeline.replace('__MARKDOWN', 'markdown')
        else:
            codeline = codeline.replace('__MARKDOWN', '')

        if output_type in [PNG, JPG]:
            codeline = codeline.replace('__PILLOW', 'pillow')
        else:
            codeline = codeline.replace('__PILLOW', '')

        interface.write(codeline)


def write_docker_compose(interface, port, app_id):

    with open(os.path.join(STATIC_PATH, 'flask_server/docker-compose.yml'), 'r') as f:
        codelines = f.readlines()

    for codeline in codelines:
        interface.write(
            codeline.replace('__PORT', str(port)).replace('__ID', str(app_id))
        )
