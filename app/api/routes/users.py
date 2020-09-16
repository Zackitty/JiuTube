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
      if len(request.files) == 0:
        username = request.form.get('username')
        fullname = request.form.get('full_name')
        email = request.form.get('email')
        beltcolor = request.form.get('belt_color')
        affiliation = request.form.get('affiliation')
        password = request.form.get('password')
        mediaurl = 'https://jiutube.s3.us-east-2.amazonaws.com/image-judo_1024x1024.png'

      elif len(request.files) > 0:
        username = request.form.get('username')
        fullname = request.form.get('full_name')
        email = request.form.get('email')
        beltcolor = request.form.get('belt_color')
        affiliation = request.form.get('affiliation')
        password = request.form.get('password')
        img = request.files['file']
        key=f'{datetime.now()}{img.filename}'
        bucket.put_object(Key=key, Body=img, ContentType=img.content_type)
        mediaurl = f'https://change-clone.s3-us-west-1.amazonaws.com/{key}'

      errors = validations_signup(username, fullname, email, beltcolor,
   affiliation, password, mediaurl)
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
    user = User.query.filter_by(username=username).first()
    temp_user = user.to_dict()
    access_token = create_access_token(identity=temp_user['id'])
    return {
        'access_token':access_token, 
        'id': temp_user['id']
        }, 200

def validations_signup(username, fullname, email, beltcolor,
   affiliation, password, mediaurl):
    regex ='[^@]+@[^@]+\.[^@]+'
    errors = []
    #Check Email is Unique
    email_found = User.query.filter(User.email == email).first()
    username_found = User.query.filter(User.username == username).first()
    if(email_found):
        errors.append('Account already exists with this email address')
    if(username_found):
        errors.append('Account already exists with this User Name')
    if not username:
      errors.append('User Name is missing')
    if not email:
        errors.append('Email is missing')
    if not full_name:
        errors.append('Name is missing')
    if not beltcolor:
        errors.append('Name is missing')
    if not password:
        errors.append('password is missing')
    if not re.search(regex, email):
        errors.append('email is not valid')
    if len(full_name) > 40:
        errors.append('Name is too long')
    if len(username) > 40:
        errors.append('User Name is too long')
    if len(email) > 255:
        errors.append('email length is too long')
    return errors

def validations_signin(username, password):
    errors = []
    user = User.query.filter_by(username=username).first()
    if not user:
        errors.append('User was not found')
        return errors
    if user: 
        password_match = bcrypt.checkpw(password.encode('utf-8'), user.encrypted_password)
        if not username:
            errors.append('Username is missing')
        if not password:
            errors.append('Password is missing')
        if not password_match: 
            errors.append('Password is incorrect')
        if len(username) > 255:
            errors.append('Username length is too long')
    return errors

def validations_details(full_name):
    errors = []
    if not full_name:
        errors.append('Name is missing')
    if len(errors) > 0:
        return errors
    if len(full_name) > 40:
        errors.append('Name length is too long')
    if len(full_name) < 1:
        errors.append('Name was not provided')
    return errors
