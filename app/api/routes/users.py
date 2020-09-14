from flask import Blueprint, jsonify, request
from app.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt
import re

bp = Blueprint('users', __name__, '')

@bp.route('/')
def index():
  response = User.query.all()
  return {user.id: user.to_dict() for user in response}

@bp.route('/signup', methods=['POST'])
def signup():
