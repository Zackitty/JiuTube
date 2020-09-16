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

@bp.route('/<int:user_id>', methods=['POST'])
def make_comment():
    content = request.form.get('content')

    newComment = Comment(user_id = user_id, content = content )
    db.session.add(newComment)
    db.session.commit()
    return newComment.to_dict()

@bp.route('/<int:id>')
def get_comment():
    response = Comment.query.filter(Comment.id == id).one()
    return response.to_dict()

@bp.route('/<int:id>', methods=['DELETE'])
def delete_comment():
  response = Comment.query.filter(Comment.id == id).one()
  response.delete
  db.session.commit()