import os
from re import search, compile, findall
from django.core.exceptions import ValidationError


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


def input_to_sys_args(codeline):

    new_codeline = ''
    name = ''

    single_quote_index = []
    double_quote_index = []
    hash_index = []
    equal_operator_index = []
    paren_open_index = []
    paren_close_index = []
    input_paren_open_index = []
    input_paren_close_index = []
    input_func_index = []

    for i in range(len(codeline)):
        if codeline[i] == "'":
            single_quote_index.append(i)
        if codeline[i] == '"':
            double_quote_index.append(i)
        if codeline[i] == '#':
            hash_index.append(i)
        if codeline[i] == '=':
            equal_operator_index.append(i)
        if codeline[i] == '(':
            paren_open_index.append(i)
        if codeline[i] == ')':
            paren_close_index.append(i)

    for i in range(len(codeline)-5):
        if codeline[i:i+6] == 'input(':
            input_paren_open_index.append(i+6)

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
            list(filter(lambda x: x < index, single_quote_index)))
        count_double_quote_index = len(
            list(filter(lambda x: x < index, double_quote_index)))
        if (
            count_single_quote_index and
            count_double_quote_index
        ) and (
            count_single_quote_index % 2 == 0 or
            count_double_quote_index % 2 == 0
        ):
            input_func_index.append(index)

    if len(equal_operator_index) != 0:
        name = codeline[:equal_operator_index[0]].replace(' ', '')

    for index in input_func_index:
        filtered_paren_close_index = list(
            filter(lambda x: x > index, paren_close_index)).sort()
        if filtered_paren_close_index:
            for position in filtered_paren_close_index:
                count_paren_close_index = position + 1
                count_paren_open_index = len(
                    list(filter(lambda x: x < position, paren_open_index)))
                if count_paren_open_index + 1 == count_paren_close_index:
                    input_paren_close_index.append(position)

    if len(input_paren_open_index) != len(input_paren_close_index):
        raise SyntaxError

    input_start_index = [
        input_func_index[i] - 6 for i in range(len(input_func_index))
    ]

    inputs = [
        new_codeline[input_start_index[i]:input_paren_close_index[i] + 1] for i in range(len(input_start_index))
    ]
    if len(inputs) == 0:
        return [], codeline

    if len(inputs) == 1:
        new_codeline = new_codeline.replace(
            inputs[0], f"sys.argv[1]['__args_input'][{str(name)}]")
        input_spec = {
            'name': name,
            'description': inputs[0][6:-2],
            # Add type soon
        }
        return [input_spec], new_codeline
    else:
        input_specs = []
        for index in range(len(inputs)):
            new_codeline = new_codeline.replace(
                inputs[index], f"sys.argv[1]['__args_input'][{str(name)+str('_')+str(index)}]")
            input_spec = {
                'name': f'{name}_{index}',
                'description': inputs[index][6:-2]
            }
            input_specs.append(input_spec)
        return input_specs, new_codeline


def replace_with_appropriates(codeline):

    has_input = False
    # need has_print for logger
