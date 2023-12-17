from backend.functions import create_uid
from backend import db


class User(db.Model):
  uid = db.Column(db.String(6), primary_key=True)
  username = db.Column(db.String(50), nullable=False, unique=True)
  password = db.Column(db.String(255), nullable=False)
  email = db.Column(db.String(100), nullable=False)

  def __init__(self, username: str, passwords: tuple, email: str) -> None:
    self.uid = create_uid(6, [a.uid for a in self.query.all()])
    self.username = username
    self.password = self._validate_passwords(passwords)
    self.email = email

  @staticmethod
  def _validate_passwords(passwords: tuple):
    p1, p2 = passwords
    if p1 != p2:
      raise AttributeError()
    return p1
  