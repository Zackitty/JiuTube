from flask import Blueprint, jsonify, request
from app.models import db, Comment, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt
import re

bp = Blueprint('comments', __name__, '')

@bp.route('/')
def get_chat():
    response = db.session.query(
        Comment
    ).limit(10)
    print(response)
    return  {result.id: { "user": result.username, "text": result.content } for result in response}
    

@bp.route('/', methods=['POST'])
def make_comment():
    content = request.form.get('message')
    user_id = request.form.get('id')
    username = request.form.get('username')

    newComment = Comment(user_id = user_id, content = content, username = username )
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

