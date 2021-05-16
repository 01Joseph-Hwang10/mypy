# How to make the application
# 1. Make a function named 'main' in the 'index.py',
# which recieves no argument( e.g. main() )
# These names are MANDATORY and can't be the other names.
# Also, if you want to recieve inputs from client, do it in index.py, wherever you want!
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
# 6. Types of following are available as input: str, int, float, complex, list, tuple, dict, set, frozenset, bool
# range, bytes, bytearray, memoryview is currently not supported
# Also, don't use input function repeatedly. For example,
# while True:
#   var=input('Give the input please: ')
#   if some_condition:
#       break
# 7. If you want to make your program recieve a file as an input,
# upload files you want to give to program in a packed zipfile.
# To access the files, use '__file_root' variable
# which will globally assigned on the runtime.
# Example of the usage would be like below
# Folder scheme of your zipped file
# |- some_chart.csv
# |- images/
# |- -- picture1.png
# |- -- picture2.png
# Code example
# import os
# path_to_chart = os.path.join(__file_root, 'some_chart.csv')
# path_to_picture1 = os.path.join(__file_root, 'images/picture1.png')

import sys
from index import main


def execute(
    global_variables,
    global_files
):

    LOG_PATH = '/log'
    LOG_FILE_PATH = f'{LOG_PATH}/log.txt'

    with open(LOG_FILE_PATH, 'w') as fw:
        sys.stdout = fw
        sys.stderr = fw

        log_array = []
        try:
            result = main(global_variables, global_files)
        except Exception as e:
            fw.write(f'{str(e)}\n')
            result = str(e)
            log_array.append(str(e))
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__
    with open(LOG_FILE_PATH, 'r') as fr:
        logs = fr.readlines()
        for i in range(len(logs)):
            log_array.append({'id': i+1, 'log': logs[i]})
    return result, log_array
