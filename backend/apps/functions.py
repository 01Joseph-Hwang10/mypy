import os
from os.path import split
import re
from django.core.exceptions import ValidationError

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


STR = 'str'
INT = 'int'
FLOAT = 'float'
COMPLEX = 'complex'
LIST = 'list'
TUPLE = 'tuple'
RANGE = 'range'
DICT = 'dict'
SET = 'set'
FROZENSET = 'frozenset'
BOOL = 'bool'


def input_to_sys_args(codeline, file_path):

    new_codeline = codeline
    name = ""

    single_quote_index = []
    double_quote_index = []
    hash_index = []
    equal_operator_index = []
    paren_open_index = []
    paren_close_index = []
    input_paren_open_index = []
    input_paren_close_index = []
    input_func_index = []

    # Get interested character's indexes
    for i in range(len(codeline)):
        if codeline[i] == "'":
            single_quote_index.append(i)
        if codeline[i] == '"':
            double_quote_index.append(i)
        if codeline[i] == "#":
            hash_index.append(i)
        if codeline[i] == "=":
            equal_operator_index.append(i)
        if codeline[i] == "(":
            paren_open_index.append(i)
        if codeline[i] == ")":
            paren_close_index.append(i)

    # Search for input with parenthesis opened
    for i in range(len(codeline) - 5):
        # Search for keyword 'input'
        if codeline[i: i + 5] == "input":
            # Walk to right to check whether there is parenthesis next to the keyword
            j = i + 4
            while j < len(codeline) - 5:
                j += 1
                if codeline[j] != " ":
                    if codeline[j] == "(":
                        input_paren_open_index.append(j)
                    break

    # Cut comment, considering quote
    for index in hash_index:
        new_single_quote_index = list(
            filter(lambda x: x < index, single_quote_index))
        new_double_quote_index = list(
            filter(lambda x: x < index, double_quote_index))
        if len(new_single_quote_index) % 2 == 0 or len(new_double_quote_index) % 2 == 0:
            new_codeline = codeline[:index]
            single_quote_index = new_single_quote_index
            double_quote_index = new_double_quote_index
            break

    for index in input_paren_open_index:
        count_single_quote_index = len(
            list(filter(lambda x: x < index, single_quote_index))
        )
        count_double_quote_index = len(
            list(filter(lambda x: x < index, double_quote_index))
        )
        if count_single_quote_index % 2 == 0 or count_double_quote_index % 2 == 0:
            input_func_index.append(index)

    if file_path != 'index.py' and len(input_func_index) != 0:
        raise SyntaxError("Input should only exist at index.py")

    if len(equal_operator_index) != 0:
        name = codeline[: equal_operator_index[0]]
        name = name.replace(" ", "")
        name = name.replace("\t", "")

    for index in input_func_index:
        filtered_paren_close_index = list(
            filter(lambda x: x > index, paren_close_index)
        )
        filtered_paren_close_index.sort()
        if filtered_paren_close_index:
            for position in range(len(filtered_paren_close_index)):

                def decider(x):
                    return bool(x < filtered_paren_close_index[position] and x > index)

                count_paren_close_index = position + 1
                count_paren_open_index = len(
                    list(
                        filter(
                            decider,
                            paren_open_index,
                        )
                    )
                )
                if count_paren_open_index + 1 == count_paren_close_index:
                    input_paren_close_index.append(
                        filtered_paren_close_index[position])

    if len(input_paren_open_index) != len(input_paren_close_index):
        raise SyntaxError(
            "Your code is not properly written in perspective of syntax related with 'input' function"
        )

    input_start_index = []

    for index in input_func_index:
        j = index
        while not new_codeline[j].isalpha():
            j -= 1
        input_start_index.append(j - 4)

    input_codes = [
        new_codeline[input_start_index[i]: input_paren_close_index[i] + 1]
        for i in range(len(input_start_index))
    ]

    inputs = []

    for index in range(len(input_codes)):
        input_type = STR
        type_start_index = int()
        type_end_index = int()

        before_input_keyword = new_codeline[: input_start_index[index]]
        code_to_analyze = before_input_keyword[::-1]

        i = 0
        while not code_to_analyze[i].isalpha() and i < len(code_to_analyze) - 1:
            i += 1
        type_end_index = i
        while code_to_analyze[i].isalpha() and i < len(code_to_analyze) - 1:
            i += 1
        type_start_index = i

        type_extracted = code_to_analyze[type_end_index:type_start_index][::-1]

        if type_extracted == INT:
            input_type = INT
        if type_extracted == FLOAT:
            input_type = FLOAT
        if type_extracted == COMPLEX:
            input_type = COMPLEX
        if type_extracted == LIST:
            input_type = LIST
        if type_extracted == TUPLE:
            input_type = TUPLE
        if type_extracted == RANGE:
            input_type = RANGE
        if type_extracted == DICT:
            input_type = DICT
        if type_extracted == SET:
            input_type = SET
        if type_extracted == FROZENSET:
            input_type = FROZENSET
        if type_extracted == BOOL:
            input_type = BOOL

        input_obj = {"codeline": input_codes[index], "type": input_type}
        inputs.append(input_obj)

    if len(inputs) == 0:
        return [], codeline

    if len(inputs) == 1:
        # new_codeline = new_codeline.replace(
        #     inputs[0]["codeline"], f"__global_vars['{str(name)}']"
        # )
        i = 0
        while inputs[0]["codeline"][i] == "(":
            i += 1
        input_spec = {
            "name": name,
            "description": inputs[0]["codeline"][i + 6: -1].strip()[1:-1],
            "type": inputs[0]["type"],
        }
        return [input_spec], False
    else:
        input_specs = []
        for index in range(len(inputs)):
            # new_codeline = new_codeline.replace(
            #     inputs[index]["codeline"],
            #     f"__global_vars['{str(name)+str('_')+str(index)}']",
            # )
            i = 0
            while inputs[index]["codeline"][i] == "(":
                i += 1
            input_spec = {
                "name": f"{name}_{index}",
                "description": inputs[index]["codeline"][i + 6: -1].strip()[1:-1],
                "type": inputs[index]["type"],
            }
            input_specs.append(input_spec)
        return input_specs, False


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


def replace_with_appropriates(codeline, file_path):

    # filter_banned_syntax(codeline)
    layer1 = input_to_sys_args(codeline, file_path)
    # layer2 = import_from_dependencies(layer1)
    result = layer1
    return result


def write_flask_app(interface, name, output_type):

    interface.write('import json\n')
    interface.write(
        'from flask import Flask, redirect, request, Response\n')
    interface.write('from flask_cors import cross_origin\n')
    interface.write('from __main import execute\n\n')
    interface.write('app=Flask(__name__)\n\n')
    interface.write('@app.route("/")\n')
    interface.write('def root():\n')
    # Temporal redirection
    interface.write('\treturn redirect("http://localhost:3000/")\n\n')
    interface.write(f'@app.route("/{name}", methods=["GET","POST"])\n')
    interface.write('@cross_origin()\n')
    interface.write('def api():\n')
    # Do client input injection
    interface.write('\ttry:\n')
    interface.write('\t\tif request.method == "POST":\n')
    # Everything should be multipart/form-data
    interface.write(
        '\t\t\tinput_data = json.loads(request.form["variables"])\n')
    interface.write('\t\t\tif json.loads(request.form["has_file_input"]):\n')
    interface.write('\t\t\t\tinput_files = request.files["files"]\n')
    interface.write('\t\t\telse:\n')
    interface.write('\t\t\t\tinput_files = dict()\n')
    interface.write('\t\telse:\n')
    interface.write('\t\t\tinput_data = dict()\n')
    interface.write('\t\t\tinput_files = dict()\n')
    interface.write(
        f'\t\tresult, log_array = execute( input_data, input_files )\n')
    interface.write('\t\tdata = {\n')
    interface.write('\t\t\t"result": result,\n')
    interface.write('\t\t\t"log": log_array\n')
    interface.write('\t\t}\n')
    interface.write(
        '\t\treturn Response(response=json.dumps(data), status=200)\n')
    interface.write('\texcept Exception as e:\n')
    interface.write(
        '\t\treturn Response(response=json.dumps(e), status=400)\n\n')
    interface.write('if __name__ == "__main__":\n')
    if DEBUG:
        interface.write('\tapp.run(debug=True)\n')
    else:
        interface.write('\tapp.run()\n')


def write_dockerfile(interface):
    # Make sure to change the python version later
    interface.write('FROM python:3.6.12-alpine\n')
    interface.write('RUN mkdir /app\n')
    interface.write('RUN mkdir /log\n')
    interface.write('WORKDIR /app\n')
    interface.write('EXPOSE 5000\n')
    interface.write('ENV PATH="/app:${PATH}"\n')
    # interface.write('COPY requirements.txt ./\n')
    # interface.write('RUN pip install --no-cache-dir requirements.txt\n')
    interface.write('RUN pip install flask flask-cors gunicorn pyjwt\n')
    interface.write('COPY ./app/ /app/\n')
    interface.write(
        'CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app" ]\n')


def tap_as_two_spaces(codeline):

    return codeline.replace('\t', '  ')


def write_docker_compose(interface, port):
    interface.write(tap_as_two_spaces('version: "3.3"\n'))
    interface.write(tap_as_two_spaces('services:\n'))
    interface.write(tap_as_two_spaces('\tserver:\n'))
    interface.write(tap_as_two_spaces('\t\tbuild:\n'))
    interface.write(tap_as_two_spaces('\t\t\tcontext: ./server\n'))
    interface.write(tap_as_two_spaces('\t\tports:\n'))
    interface.write(tap_as_two_spaces(f"\t\t\t- '{port}:5000'\n"))
    # interface.write(tap_as_two_spaces('\tnginx:\n'))
    # interface.write(tap_as_two_spaces('\t\timage: nginx:latest\n'))
    # interface.write(tap_as_two_spaces('\t\tports:\n'))
    # interface.write(tap_as_two_spaces(f'\t\t\t- "{port}:{port}"\n'))
    # interface.write(tap_as_two_spaces('\t\tdepends_on:\n'))
    # interface.write(tap_as_two_spaces('\t\t\t- server\n'))
