from flask_sqlalchemy import SQLAlchemy
# from app import app

db = SQLAlchemy()


class App(db.Model):

    __tablename__ = 'app'

    id = db.Column(db.Integer, primary_key=True)
    app_id = db.Column(db.Integer)
    name = db.Column(db.String(50))
    port = db.Column(db.Integer)
    output_type = db.Column(db.String(20))

    # def __init__(self, app_id, name, port, output_type):
    #     self.app_id = app_id
    #     self.name = name
    #     self.port = port
    #     self.output_type = output_type


# db.init_app(app)
# db.app = app
# db.create_all()
