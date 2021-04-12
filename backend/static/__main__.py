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

import sys
from index import main


def set_sys_args(sys_args):

    sys.argv = sys_args
