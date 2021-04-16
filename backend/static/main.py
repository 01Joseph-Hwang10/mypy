# How to make the application
# 1. Make a function named 'main',
# which recieves no argument( e.g. main() )
# This name is MANDATORY and can't be the other name.
# 2. Call every functions that you want to execute in main()
# 3. Return value is required and recommended for main()
# This return value can be the result of your app's output
# from processed input, or status of if the app is successfully executed, etc.
# If there's no return value, the app will return the result of
# if the app's execution was successful.
# 4. Every variables you assigned with input() will be converted as form input
# in this app interface so that you can give the value to them for your app.
# Also, all print() statement will be logged and will be recorded as txt file,
# which you can see at the 'log' button at the topright.
# 5. You can't re-assign or manipulate the sys.argv value
# since we use that value as input receiver.
# If you want to access to sys.argv value, please use the codeline like below:
# First approach:
# import sys
# sys_store = sys.argv
# Second approach:
# from sys import argv
# sys_store = argv
# 6. If your app receives input and assigns it as variable, please use one of the code formats like below
# ( e.g. var1 = input('Please give the input name var1: ') )
# ( e.g. var2 = int(input('Please give the input name var2[Integer]: ')) )
# ( e.g. var3 = float(input('Please give the input name var3[Float]: ')) )
# Types of following are available as input: str, int, float, complex, list, tuple, range, dict, set, frozenset, bool
# bytes, bytearray, memoryview is not supported
# Also, don't use input function repeatedly. For example,
# while True:
#   var=input('Give the input please: ')
#   if some_expression:
#       break

import sys
import os
from app.index import main


def execute(sys_args_key, sys_args_value, log_path):

    log_file_path = os.path.join(log_path, 'log.txt')

    with open(log_file_path, 'w') as f:
        sys.stdout = f
        sys_args_except_base = list(filter(lambda x: bool(
            x not in ['manage.py', 'runserver']), sys.argv))
        if len(sys_args_except_base) == 0:
            sys.argv.append({})
        print(sys.argv)
        sys.argv[-1][sys_args_key] = sys_args_value

        result = main()
        sys.stdout = sys.__stdout__
    with open(log_file_path, 'r') as f:
        logs = f.readlines()
        log_array = []
        for i in range(len(logs)):
            log_array.append({'id': i+1, 'log': logs[i]})
    del sys.argv[-1][sys_args_key]
    return result, log_array
