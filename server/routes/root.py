from flask import Blueprint, redirect
from flask_cors import CORS
from __config import CROSS_ORIGIN_WHITELIST

bp = Blueprint('root', __name__, url_prefix='/')

CORS(bp, origins=CROSS_ORIGIN_WHITELIST)


@bp.route('/', methods=['GET'])
def root():

    # Temporal redirection
    return redirect('http://localhost:3000')
