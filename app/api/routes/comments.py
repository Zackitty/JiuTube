from flask import Blueprint, jsonify, request
from app.models import db, Comment, User

bp = Blueprint('comments', __name__)

@bp.route('')
def get_chat():
    response = db.session.query(
        Comment
    ).order_by(Comment.id.desc()).limit(10)
    
    return  {result.id: { "user": result.username, "text": result.content, "avatar": result.avatar, "belt_color": result.belt_color, "user_id": result.user_id } for result in response}
    

@bp.route('', methods=['POST'])
def make_comment():
    content = request.form.get('message')
    user_id = request.form.get('id')
    username = request.form.get('username')
    avatar = request.form.get('avatar')
    belt_color = request.form.get('belt_color')

    newComment = Comment(user_id = user_id, content = content, username = username, avatar = avatar, belt_color = belt_color )
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

