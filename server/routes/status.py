from flask import Blueprint, Response
import json
from __config import CROSS_ORIGIN_WHITELIST, SERVER_NUMBER
from __db import App
from flask_cors import CORS

bp = Blueprint('status', __name__, url_prefix='/status')

CORS(bp, origins=CROSS_ORIGIN_WHITELIST)


@bp.route('/', methods=['GET'])
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
