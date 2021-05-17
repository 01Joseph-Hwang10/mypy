import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SERVER_NUMBER = 1
SERVER_ADDRESS = 'http://localhost'

DEBUG = True

SECRET_KEY = '#08y$puf(yn%@a#-%!l0o2anef9rl(+n%_3a!$zp_zjfo+aeyh'

UPLOAD_ROOT = os.path.join(BASE_DIR, 'uploads/')

# Cors

CROSS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://localhost:3000',
    'https://127.0.0.1:3000'
]

# DB

DB_PATH = os.path.join(BASE_DIR, 'db.sqlite3')

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DB_PATH
SQLALCHEMY_COMMIT_ON_TEARDOWN = True
SQLALCHEMY_TRACK_MODIFICATIONS = False
