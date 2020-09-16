import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO, send
from app.models import db, User, Post, Comment, Thread
from app.api.api import user_routes, comment_routes
from app.config import Config

app = Flask(__name__, static_url_path='')

app.config.from_object(Config)
# app.register_blueprint(forum_routes, url_prefix='/api/forums')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(user_routes, url_prefix='/api/comments')
db.init_app(app)
jwt = JWTManager(app)
Migrate(app, db, compare_type=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['FLASKS3_BUCKET_NAME'] = ''


# Application Security
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app)
if __name__ == '__main__':
    socketIo.run(app)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')

@socketio.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

