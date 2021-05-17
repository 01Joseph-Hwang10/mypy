import os
import subprocess
from flask import Flask, redirect, request
from flask.wrappers import Response
from config import CROSS_ORIGIN_WHITELIST, DEBUG, SECRET_KEY, UPLOAD_ROOT
from flask_cors import cross_origin
import json
from zipfile import ZipFile
from functions import extract_recursively
import shutil

app = Flask(__name__)


@app.route('/')
def root():

    # Temporal redirection
    return redirect('http://localhost:3000')


@app.route('/status')
@cross_origin(origins=CROSS_ORIGIN_WHITELIST)
def get_status():

    pass


@app.route('/create', methods=["POST"])
@cross_origin(origins=CROSS_ORIGIN_WHITELIST)
def create_app():

    try:
        secret_key = request.form['SECRET_KEY']
        if secret_key != SECRET_KEY:
            raise ValueError('Unauthorized request')
        app_spec = request.form['app_spec']
        app_id = app_spec['id']
        app_source = request.files['app_source']

        if not os.path.exists(UPLOAD_ROOT):
            os.mkdir(UPLOAD_ROOT)

        save_directory = os.path.join(UPLOAD_ROOT, app_id)

        with ZipFile(app_source) as zf:
            dirs = zf.namelist()
            extract_recursively('', dirs, zf, save_directory)

        if DEBUG:
            subp = subprocess.Popen(
                ['docker-compose', 'up', '--build'], cwd=save_directory)
        else:
            subp = subprocess.Popen(
                ['docker-compose', 'up', '--build', '-d'], cwd=save_directory)
            subp.wait()
        return Response(status=200, response="Successfully deployed!")
    except Exception as e:
        print(e)
        return Response(status=400, response=json.dumps(str(e)))


@app.route('/delete', methods=["POST"])
@cross_origin(origins=CROSS_ORIGIN_WHITELIST)
def delete_app():

    try:
        secret_key = request.form['SECRET_KEY']
        if secret_key != SECRET_KEY:
            raise ValueError('Unauthorized request')
        app_id = request.form['id']
        save_directory = os.path.join(UPLOAD_ROOT, app_id)
        subp = subprocess.Popen(
            ['docker-compose', 'down'], cwd=save_directory
        )
        subp.wait()
        shutil.rmtree(save_directory)
    except Exception as e:
        print(e)
        return Response(status=500, data="Something went wrong")
