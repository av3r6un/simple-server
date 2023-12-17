import os
import yaml


class Settings:
  default_settings = {
    'PROJECT_NAME': 'SimpleServer',
    'VERSION': '1.0.0',
    'AUTHOR': '//github.com/av3r6un',
    'admin': {'username': 'admin', 'passwords': ('admin', 'admin'), 'email': 'admin@example.com'},
  }
  
  def __init__(self) -> None:
    self.st_name = None
    self.current_path = os.path.abspath(os.path.dirname(__file__))

  def init_app(self, app):
    self.st_name = app.config.get('SETTINGS_FILENAME')
    self._load_settings()

  def _load_settings(self):
    if not os.path.exists(os.path.join(self.current_path, self.st_name)):
      with open(os.path.join(self.current_path, self.st_name), 'w', encoding='utf-8') as file:
        yaml.safe_dump(self.default_settings, file)
    with open(os.path.join(self.current_path, self.st_name), 'r', encoding='utf-8') as file:
      data = yaml.safe_load(file)
    self.__dict__.update(data)
  