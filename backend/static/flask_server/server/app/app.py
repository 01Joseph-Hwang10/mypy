import json
import os
from flask import Flask, redirect, request, Response
from flask_cors import cross_origin
from __main import execute

app = Flask(__name__)


@app.route('/')
def root():

    # Temporal redirection
    return redirect('http://localhost:3000')


@app.route('/__NAME', methods=["GET", "POST"])
@cross_origin()
def api():

    # Do client input injection
    try:
        if request.method == "POST":
            # Everything should be multipart/form-data
            input_data = json.loads(request.form['variables'])
            if json.loads(request.form['has_file_input']):
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

        result, log_array = execute(input_data, input_files)

        data = {
            'result': result,
            'log': log_array
        }

        return Response(response=json.dumps(data), status=200)
    except Exception as e:
        return Response(response=json.dumps(e), status=400)
