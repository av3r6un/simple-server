from flask import Blueprint, jsonify, request as req
from datetime import datetime as dt


main = Blueprint('main', __name__)


@main.route('/', methods=['GET', 'POST'])
def index():
  time_now = {'time': dt.now().strftime('%Y-%m-%d %H:%M:%S')}
  return jsonify({'status': 'success', 'body': time_now})
