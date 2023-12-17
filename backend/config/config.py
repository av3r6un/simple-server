from datetime import timedelta
import os


class Config:
  SECRET_KEY = os.environ.get('SECRET')
  JWT_SECRET_KEY = SECRET_KEY
  JWT_COOKIE_SECURE = False
  JWT_TOKEN_LOCATION = ['headers']
  JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
  JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=5)
  SETTINGS_FILENAME = 'settings.yaml'
  SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(os.path.abspath(os.path.dirname(__file__)), "../database.db")}'
  SQLALCHEMY_TRACK_MODIFICATIONS = False
