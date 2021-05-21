from flask import Flask, redirect
from __config import (
    DEBUG,
    SECRET_KEY,
    SQLALCHEMY_COMMIT_ON_TEARDOWN,
    SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS,
)
from __db import db
# from flask_apscheduler import APScheduler
from routes import delete, status, health_check, create

app = Flask(__name__)


@app.route('/', methods=['GET'])
def root():

    # Temporal redirection
    return redirect('http://localhost:3000')


app.register_blueprint(status.bp)
app.register_blueprint(health_check.bp)
app.register_blueprint(create.bp)
app.register_blueprint(delete.bp)


app.config.update(
    SECRET_KEY=SECRET_KEY,
    SQLALCHEMY_DATABASE_URI=SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_COMMIT_ON_TEARDOWN=SQLALCHEMY_COMMIT_ON_TEARDOWN,
    SQLALCHEMY_TRACK_MODIFICATIONS=SQLALCHEMY_TRACK_MODIFICATIONS,
)

db.init_app(app)
db.app = app
db.create_all()

# scheduler = APScheduler(app)


if __name__ == '__main__':
    if DEBUG:
        app.run(debug=True)
    else:
        app.run()
