from flask import Blueprint, jsonify, request
from app.models import db, Comment, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt
import re

@bp.route('', methods=['POST'])
def block_user():

    newComment = Comment(user_id = user_id, content = content, username = username, avatar = avatar, belt_color = belt_color )
    db.session.add(newComment)
    db.session.commit()
    return newComment.to_dict()

@bp.route('/<int:id>')
def get_blocks():
      