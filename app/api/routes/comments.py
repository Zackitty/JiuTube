from flask import Blueprint, jsonify, request
from app.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt
import re

bp = Blueprint('comments', __name__, '')

@bp.route('/')
def get_chat():
  chatbox = Comment.query.all()
  chat = {str(comment.id): comment.to_dict()
                           for comment in chatbox}
    return chat

@bp.route('/', methods=['POST'])
def make_comment():


@bp.route('/<int:id>')
def get_comment():

@bp.route('/<int:id>', methods=['DELETE'])
def delete_comment():