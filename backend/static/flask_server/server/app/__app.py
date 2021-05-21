import json
import os
from flask import Flask, redirect, request, Response
from flask_cors import cross_origin
from __main import execute
import __constants
import io

app = Flask(__name__)

__MIMETYPE = '$MIMETYPE'


@app.route('/', methods=['GET'])
def root():

    # Temporal redirection
    return redirect('http://localhost:3000')


@app.route('/health_check', methods=['GET'])
def health_check():

    return Response(status=200, data='Server is on duty')


@app.route('/$NAME', methods=["GET", "POST"])
@cross_origin()
def api():

    # Do client input injection
    try:
        if request.method == "POST":
            # Everything should be multipart/form-data
            input_data = json.loads(request.form['variables'])
            if json.loads(request.form['has_file_input']):
                if len(request.files) > 4:
                    error_msg = 'Too many files which is not allowed!!'
                    raise BufferError(error_msg)
                for file in request.files:
                    max_size = 10 * 1048576
                    if os.stat(file).st_size > max_size:
                        error_msg = 'File is over 10 mb which is not allowed!!'
                        raise BufferError(error_msg)
                input_files = request.files
            else:
                input_files = dict()
        else:
            input_data = dict()
            input_files = dict()

        result, _, ok = execute(input_data, input_files)

        if not ok:
            return Response(status=500, response=json.dumps(result))

        if __MIMETYPE == __constants.JSON:
            if type(result) not in __constants.TYPE_CLASSES:
                types_allowed = ', '.join(__constants.TYPES)
                raise TypeError(
                    f"""
                    The return value of your app is not JSON serializable type.
                    The type you can return are those of follows: {types_allowed}. 
                    The type your app returned is the value with following type: {type(result)}.
                    """
                )
            data = json.dumps(result)
            return Response(response=data, status=200, mimetype=__MIMETYPE)

        if __MIMETYPE == __constants.MD:
            if type(result) != type(str()):
                raise TypeError(
                    'The type of return value of your app should be "str"')
            data = result
            return Response(response=data, status=200, mimetype='text/html')

        if __MIMETYPE in [__constants.JPG, __constants.PNG]:
            if type(result) == type(bytes):
                data = result
            else:
                try:
                    temp = io.BytesIO()
                    ext = __MIMETYPE.split('/')[1].upper()
                    result.save(temp, format=ext)
                    data = temp.getvalue()
                except:
                    raise TypeError(
                        """
                        Not a valid type of return value of your app. 
                        The return value of your app should be either 
                        Image object provided by PIL library or bytes.
                        """
                    )
            return Response(response=data, status=200, mimetype=__MIMETYPE)

        if __MIMETYPE in __constants.OUTPUT_TYPES:
            data = result
            return Response(response=data, status=200, mimetype=__MIMETYPE)

        raise TypeError('Not a valid mimetype. Please re-deploy your app')
    except Exception as e:
        return Response(response=json.dumps(str(e)), status=500)
