from flask import Blueprint, request, Response
from __config import CROSS_ORIGIN_WHITELIST, SECRET_KEY, UPLOAD_ROOT
import subprocess
import os
import shutil
from __db import db, App
from flask_cors import CORS

bp = Blueprint('delete', __name__, url_prefix='/delete')

CORS(bp, origins=CROSS_ORIGIN_WHITELIST)


@bp.route('/', methods=["POST"])
def delete_app():

    try:
        save_directory = False
        secret_key = request.form['SECRET_KEY']
        if secret_key != SECRET_KEY:
            raise ValueError('Unauthorized request')
        app_id = request.form['id']
        save_directory = os.path.join(UPLOAD_ROOT, str(app_id))
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
