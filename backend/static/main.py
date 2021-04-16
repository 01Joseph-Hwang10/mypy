# How to make the application
# 1. Make a function named 'main' in the 'index.py',
# which recieves no argument( e.g. main() )
# These names are MANDATORY and can't be the other names.
# 2. Call every functions that you want to execute in main()
# 3. Return value is recommended for main()
# This return value can be the result of your app's output
# from processed input, or status of if the app is successfully executed, etc.
# 4. Every variables you assigned with input() will be converted as form input
# in this app interface so that you can give the value to them for your app.
# Also, all print() statement will be logged and will be recorded as txt file,
# which you can see at the 'log' button at the topright.
# 5. If your app receives input and assigns it as variable, please use one of the code formats like below
# ( e.g. var1 = input('Please give the input name var1: ') )
# ( e.g. var2 = int(input('Please give the input name var2[Integer]: ')) )
# ( e.g. var3 = float(input('Please give the input name var3[Float]: ')) )
# 6. Types of following are available as input: str, int, float, complex, list, tuple, range, dict, set, frozenset, bool
# bytes, bytearray, memoryview is not supported
# Also, don't use input function repeatedly. For example,
# while True:
#   var=input('Give the input please: ')
#   if some_condition:
#       break

import sys
import os


def execute(log_path):

    log_file_path = os.path.join(log_path, 'log.txt')

    with open(log_file_path, 'w') as f:
        sys.stdout = f

        result = main()
        sys.stdout = sys.__stdout__
    with open(log_file_path, 'r') as f:
        logs = f.readlines()
        log_array = []
        for i in range(len(logs)):
            log_array.append({'id': i+1, 'log': logs[i]})
    return result, log_array
