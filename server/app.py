import os
import re
import subprocess
from flask import Flask, redirect, request, Response
from requests.exceptions import ProxyError
from config import (
    CROSS_ORIGIN_WHITELIST,
    DEBUG,
    SECRET_KEY,
    SERVER_ADDRESS,
    SERVER_NUMBER,
    SQLALCHEMY_COMMIT_ON_TEARDOWN,
    SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS,
    UPLOAD_ROOT
)
from flask_cors import cross_origin
import json
from zipfile import ZipFile
from db import db, App
from functions import extract_recursively
import shutil
import requests
from time import sleep
from flask_apscheduler import APScheduler

app = Flask(__name__)


@app.route('/', methods=['GET'])
def root():

    # Temporal redirection
    return redirect('http://localhost:3000')


@app.route('/status', methods=['GET'])
@cross_origin(origins=CROSS_ORIGIN_WHITELIST)
def get_status():

    try:
        app_count = len(App.query.all())
        current_status = {
            'number_of_apps': app_count,
            'server_number': SERVER_NUMBER
        }

        return Response(response=json.dumps(current_status), status=200)
    except Exception as e:
        print(e)
        return Response(status=500, data="Something went wrong")


@app.route('/health_check', methods=['GET'])
@cross_origin(origin=CROSS_ORIGIN_WHITELIST)
def health_check():

    try:
        app_id = request.args.get('id')
        app = App.query.filter_by(app_id=app_id).first()
        port = app.port
        result = requests.get(f'{SERVER_ADDRESS}:{port}/health_check')
        if result.status_code != 200:
            raise ProxyError('Server not responding')
        return Response(status=200, response='Server is healthy')
    except Exception as e:
        print(e)
        return Response(status=500, response="Server is not healthy")


@app.route('/create', methods=["POST"])
@cross_origin(origins=CROSS_ORIGIN_WHITELIST)
def create_app():

    try:
        save_directory = False
        secret_key = request.form['SECRET_KEY']
        if secret_key != SECRET_KEY:
            raise ValueError('Unauthorized request')
        app_spec = json.loads(request.form['app_spec'])
        app_id = app_spec['id']
        app_source = request.files['app_source']

        if not os.path.exists(UPLOAD_ROOT):
            os.mkdir(UPLOAD_ROOT)

        save_directory = os.path.join(UPLOAD_ROOT, str(app_id))

        with ZipFile(app_source) as zf:
            dirs = zf.namelist()
            extract_recursively('', dirs, zf, save_directory)

        os.remove(os.path.join(save_directory, 'container.zip'))

        # sleep(30)

        subp1 = subprocess.Popen(
            ['docker-compose', 'up', '--build', '-d'],
            cwd=save_directory,
        )
        subp1.wait()

        subp2 = subprocess.Popen(
            ['docker', 'ps'],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT
        )
        subp2.wait()

        process_output, _ = subp2.communicate()
        process_output = process_output.decode('utf-8')

        output_lines = process_output.split('\n')
        del output_lines[0]

        port = app_spec['port']
        deployment_successful = False
        if output_lines and len(output_lines) != 0:
            for output in output_lines:
                output_names = output.split()
                if not output_names:
                    continue
                splitted = output_names[-1].split('_')
                regex = re.compile('server')
                server_app_id = False
                for i in splitted:
                    does_exist = regex.search(i)
                    if does_exist:
                        app_id_target = i.replace('server', '')
                        try:
                            server_app_id = int(app_id_target)
                        except:
                            pass
                if str(server_app_id) == str(app_id):
                    deployment_successful = True

        if not deployment_successful:
            raise BufferError('Deployment failed! Please try it later')

        name = app_spec['name']
        output_type = app_spec['output_type']

        new_app = App(app_id=app_id, name=name,
                      port=port, output_type=output_type,)
        db.session.add(new_app)
        db.session.commit()

        return Response(status=200, response="Successfully deployed!")
    except Exception as e:
        print(e)
        if save_directory:
            subp = subprocess.Popen([
                'docker-compose', 'down'
            ], cwd=save_directory)
            subp.wait()
            shutil.rmtree(save_directory)
        return Response(status=400, response=json.dumps(str(e)))


@app.route('/delete', methods=["POST"])
@cross_origin(origins=CROSS_ORIGIN_WHITELIST)
def delete_app():

    try:
        save_directory = False
        secret_key = request.form['SECRET_KEY']
        if secret_key != SECRET_KEY:
            raise ValueError('Unauthorized request')
        app_id = request.form['id']
        save_directory = os.path.join(UPLOAD_ROOT, app_id)
        if os.path.exists(save_directory):
            subp = subprocess.Popen(
                ['docker-compose', 'down'], cwd=save_directory
            )
            subp.wait()
            shutil.rmtree(save_directory)
        app = App.query.filter_by(app_id=app_id).all()
        if app:
            db.session.delete(app[0])
            db.session.commit()
        return Response(status=200, response='Successfully deleted')
    except Exception as e:
        print(e)
        return Response(status=500, response="Something went wrong")


app.config.update(
    SECRET_KEY=SECRET_KEY,
    SQLALCHEMY_DATABASE_URI=SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_COMMIT_ON_TEARDOWN=SQLALCHEMY_COMMIT_ON_TEARDOWN,
    SQLALCHEMY_TRACK_MODIFICATIONS=SQLALCHEMY_TRACK_MODIFICATIONS,
)

db.init_app(app)
db.app = app
db.create_all()

scheduler = APScheduler(app)


if __name__ == '__main__':
    if DEBUG:
        app.run(debug=True)
    else:
        app.run()
