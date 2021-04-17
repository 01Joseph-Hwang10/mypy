import os
import re
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


def input_to_sys_args(codeline):

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

    for i in range(len(codeline) - 5):
        if codeline[i: i + 5] == "input":
            j = i + 4
            while j < len(codeline) - 5:
                j += 1
                if codeline[j] == "(":
                    input_paren_open_index.append(j)
                    break

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

    if len(equal_operator_index) != 0:
        name = codeline[: equal_operator_index[0]].replace(" ", "")

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
            "Your code is not properly written in perspective of syntax related with 'input' function")

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
        new_codeline = new_codeline.replace(
            inputs[0]["codeline"], f"__global_vars['{str(name)}']"
        )
        i = 0
        while inputs[0]["codeline"][i] == "(":
            i += 1
        input_spec = {
            "name": name,
            "description": inputs[0]["codeline"][i + 6: -1].strip()[1:-1],
            "type": inputs[0]["type"],
        }
        return [input_spec], new_codeline
    else:
        input_specs = []
        for index in range(len(inputs)):
            new_codeline = new_codeline.replace(
                inputs[index]["codeline"],
                f"__global_vars['{str(name)+str('_')+str(index)}']",
            )
            i = 0
            while inputs[index]["codeline"][i] == "(":
                i += 1
            input_spec = {
                "name": f"{name}_{index}",
                "description": inputs[index]["codeline"][i + 6: -1].strip()[1:-1],
                "type": inputs[index]["type"],
            }
            input_specs.append(input_spec)
        return input_specs, new_codeline


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


def replace_with_appropriates(codeline):

    # filter_banned_syntax(codeline)
    result = input_to_sys_args(codeline)
    return result
