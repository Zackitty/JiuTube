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
      if len(request.files) == 0 and request.form.get('mediaurl') == '':
        username = request.form.get('username')
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        belt_color = request.form.get('belt_color')
        affiliation = request.form.get('affiliation')
        password = request.form.get('password')
        mediaurl = 'https://jiutube.s3.us-east-2.amazonaws.com/image-judo_1024x1024.png'

      elif len(request.files) > 0:
        username = request.form.get('username')
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        belt_color = request.form.get('belt_color')
        affiliation = request.form.get('affiliation')
        password = request.form.get('password')
        img = request.files['file']
        key=f'{datetime.now()}{img.filename}'
        bucket.put_object(Key=key, Body=img, ContentType=img.content_type)
        mediaurl = f'https://change-clone.s3-us-west-1.amazonaws.com/{key}'

      errors = validations_signup(email, full_name, password, belt_color)
      if len(errors) > 0:
        return {'errors': errors}, 401

    #hash password
      hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14))

    #create user in database
      addUser = User(email=email, full_name=full_name, mediaurl=mediaurl, belt_color=belt_color, 
                   affiliation=affiliation, encrypted_password=hashed_password)
      db.session.add(addUser)
      db.session.commit()

    #get id from insertedgit user
      user1 = User.query.filter(User.email == email).first()
      temp_user = user1.to_dict()
    
    #create jwt and send back to frontend
      access_token = create_access_token(identity=temp_user['id'])
      return {
            'access_token':access_token, 
            'id': temp_user['id']
            }, 200

@bp.route('/signin', methods=['POST'])
def signin():
    #gather user submitted data
    username = request.json.get('username')
    password = request.json.get('password')

    #Error Handling Validations
    errors = validations_signin(email, password)
    if len(errors) > 0:
        return {'errors': errors}, 400

    #Pass validations, find user, create jwt, return user data
    user = User.query.filter_by(username=e=username).first()
    temp_user = user.to_dict()
    access_token = create_access_token(identity=temp_user['id'])
    return {
        'access_token':access_token, 
        'id': temp_user['id']
        }, 200