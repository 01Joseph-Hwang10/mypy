from flask import Blueprint, Response, request
from ..config import CROSS_ORIGIN_WHITELIST, SERVER_ADDRESS
from flask_cors import CORS
import requests
from ..db import App
from requests.exceptions import ProxyError


bp = Blueprint('health_check', __name__, url_prefix='/health_check')

CORS(bp, origins=CROSS_ORIGIN_WHITELIST)


@bp.route('/health_check', methods=['GET'])
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
