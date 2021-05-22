from flask import Blueprint, Response, request
from __config import CROSS_ORIGIN_WHITELIST, UPLOAD_ROOT, SECRET_KEY, DEBUG
import subprocess
from __functions import extract_recursively
import json
from flask_cors import CORS
import os
from zipfile import ZipFile
import re
from __db import App, db
import shutil


bp = Blueprint('create', __name__, url_prefix='/create')

CORS(bp, origins=CROSS_ORIGIN_WHITELIST)


@bp.route('/', methods=["POST"])
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

        port = app_spec['port']
        if DEBUG:
            subp1 = subprocess.Popen(
                ['docker-compose', 'up', '--build'],
                cwd=save_directory,
            )
        else:
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
