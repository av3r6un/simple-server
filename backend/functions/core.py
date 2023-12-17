import secrets
import string


def create_uid(length: int, uids: list) -> str:
  alp = string.ascii_letters + string.digits
  while True:
    uid = ''.join(secrets.choice(alp) for _ in range(length))
    if uid not in uids:
      return uid


def create_first_user(creds):
  from backend.models import User
  admin = User.query.filter_by(username=creds['username']).first()
  if not admin:
    User(**creds)
    return True
