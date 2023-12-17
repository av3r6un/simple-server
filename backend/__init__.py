from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask
from .config import Settings
import sys


app = Flask(__name__)
db = SQLAlchemy()
bcrypt = Bcrypt(app)
jwt = JWTManager()
settings = Settings()


def create_app():
  from .config import Config
  app.config.from_object(Config())

  settings.init_app(app)

  db.init_app(app)

  from .views import main
  app.register_blueprint(main, url_prefix='/')

  jwt.init_app(app)
  
  from .models import User

  @jwt.user_lookup_loader
  def user_lookup_callback(_jwt_header, jwt_data):
    iden = jwt_data['sub']
    return User.query.filter_by(username=iden).one_or_none()
  
  @jwt.expired_token_loader
  def expired_token_callback(_jwt_header, jwt_payload):
    return {'msg': 'THE'}, 401
  
  @jwt.invalid_token_loader
  def invalid_token_callback(_jwt_header):
    return {'msg': 'TNF'}, 401
  
  from .functions import create_first_user

  with app.app_context():
    db.create_all()
    create_first_user(settings.admin)

  return app
