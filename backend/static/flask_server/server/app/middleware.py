from flask import request, Response
import os
import json


class FileSizeValidator:

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        if json.loads(request.form['has_file_input']):
            for file in request.files:
                max_size = 10 * 1048576
                if os.stat(file).st_size > max_size:
                    error_msg = 'File is over 10 mb which is not allowed!!'
                    return Response(response=json.dumps(error_msg), status=400)


class Middleware(FileSizeValidator):

    def __init__(self, app):
        self.app = app

    pass
