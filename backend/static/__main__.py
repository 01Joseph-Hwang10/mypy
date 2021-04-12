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
# 5. You can't re-assign the sys.argv value.
# sys.argv value is in state of object type,
# and every variable you assigning as input function will be converted as
# form input at your app interface and the variable will be stored at
# sys.argv['--sys-args']. These below are some approaches recommended
# for storing something in sys.argv
# ( e.g. sys.argv['your_var_key'] = your_var_value )
# ( e.g. sys.argv['your_sys_argv_list'] = ['var1','var2','var3','var4'] )
# ( e.g. sys.argv['your_sys_argv_dict'] = { 'key1': 'value1', 'key2': 'value2' } )

import sys
from index import main


def set_sys_args(sys_args):

    sys.argv = sys_args
