import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SERVER_NUMBER = int(os.environ.get('SERVER_NUMBER'))
SERVER_ADDRESS = os.environ.get('SERVER_ADDRESS')

DEBUG = DEBUG = bool(os.environ.get('DEBUG') != 'False')

SECRET_KEY = os.environ.get('SECRET_KEY')

UPLOAD_ROOT = os.path.join(BASE_DIR, 'uploads/')

# Cors

CROSS_ORIGIN_WHITELIST = [
    host for host in os.environ.get('CROSS_ORIGIN_WHITELIST').split(' ') if len(host) != 0
]

# DB

DB_PATH = os.path.join(BASE_DIR, 'db.sqlite3')

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DB_PATH
SQLALCHEMY_COMMIT_ON_TEARDOWN = True
SQLALCHEMY_TRACK_MODIFICATIONS = False
