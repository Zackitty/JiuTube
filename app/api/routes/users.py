from flask import Blueprint, jsonify, request
from app.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt
import re

bp = Blueprint('users', __name__, '')

@bp.route('')
def index():
  response = User.query.all()
  return {user.id: user.to_dict() for user in response}

@bp.route('/signup', methods=['POST'])
def signup():
      if len(request.form['mediaurl']) == 0:
        username = request.form.get('username')
        fullname = request.form.get('full_name')
        email = request.form.get('email')
        belt_color = request.form.get('belt_color')
        affiliation = request.form.get('affiliation')
        password = request.form.get('password')
        mediaurl = 'https://jiutube.s3.us-east-2.amazonaws.com/image-judo_1024x1024.png'

      elif len(request.form['mediaurl']) > 0:
        username = request.form.get('username')
        fullname = request.form.get('full_name')
        email = request.form.get('email')
        belt_color = request.form.get('belt_color')
        affiliation = request.form.get('affiliation')
        password = request.form.get('password')
        mediaurl = request.form['mediaurl']

      errors = validations_signup(username, fullname, email, belt_color,
   affiliation, password, mediaurl)
      if len(errors) > 0:
        return {'errors': errors}, 401

    #hash password
      hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14))

    #create user in database
      addUser = User(username=username, email=email, full_name=fullname, avatar=mediaurl, belt_color=belt_color, 
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
            'id': temp_user['id'],
            'belt_color': belt_color
            }, 200

@bp.route('/signin', methods=['POST'])
def signin():
    #gather user submitted data
    username = request.json.get('username')
    password = request.json.get('password')
    
    #Error Handling Validations
    errors = validations_signin(username, password)
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

@bp.route('/<int:id>', methods=['GET','PATCH'])
def user_page(id):
    if request.method == 'GET':
        found_user = User.query.filter(User.id == id).first()
        if found_user:
            return found_user.to_dict()
        else:
            return {'error': "User not found"}, 400
    else:
        #gather user submitted data
        json = request.get_json()
        username = json.get('username')

        #validate user submitted data
        errors = validations_user_details(last_name, first_name)
        if len(errors) > 0:
            return {'errors': errors}

        #get id from json web token
        current_user_id = get_jwt_identity()

        #if user is found in database then update user details. If not, send error to client
        found_user = User.query.filter(User.id == current_user_id).first()
        if(found_user):
            found_user.username = username
            db.session.commit()
            return {'message':'Success'}, 200
        else:
            return {'error': 'User was not found'}, 400

@bp.route('/delete_account', methods=['DELETE'])
@jwt_required
def delete_account():
    #get id from json web token
    current_user_id = get_jwt_identity()

    #retrieve user from data to be deleted if exists
    temp_user = User.query.filter(User.id == current_user_id).first()
    if temp_user is None:
        return {'error': 'User with given id does not exist'}, 400

    #delete user from database
    db.session.delete(temp_user)
    db.session.commit()
    return {'status': 200}


def validations_signup(username, fullname, email, belt_color,
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
    if not fullname:
        errors.append('Name is missing')
    if not belt_color:
        errors.append('Name is missing')
    if not password:
        errors.append('password is missing')
    if not re.search(regex, email):
        errors.append('email is not valid')
    if len(fullname) > 40:
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

def validations_details(fullname):
    errors = []
    if not fullname:
        errors.append('Name is missing')
    if len(errors) > 0:
        return errors
    if len(fullname) > 40:
        errors.append('Name length is too long')
    if len(fullname) < 1:
        errors.append('Name was not provided')
    return errors
