from app.models import User, Block
from app import app, db
from dotenv import load_dotenv
import bcrypt
load_dotenv()
with app.app_context():
  db.drop_all()
  db.create_all()

  demo_user = User(username = 'Demo', full_name = 'demo land', email = 'demo@demo.com',
   belt_color = 'White', affiliation ='Creonte', avatar = 'https://64.media.tumblr.com/8f7293582ad27f32775be6c5fd4f3f37/5e7104cb65b9b19f-fc/s540x810/ea9552a4ce96ce440bc0c9b40864a89e10df73f8.png', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))

  mister_3 = User(username = 'Mr 3', full_name = 'demo land', email = 'mister3@demo.com',
   belt_color = 'Blue', affiliation ='Gracie Barra', avatar = 'https://64.media.tumblr.com/344fe0498afb2560cc8f09d5099f0bca/5e7104cb65b9b19f-39/s400x600/27aefbdd04d1d6d0a1a8ef38b716bf75d3fc3121.png', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))

  miss_monday = User(username = 'Miss Monday', full_name = 'demo land', email = 'missmonday@demo.com',
   belt_color = 'Purple', affiliation ='Alliance', avatar = 'https://64.media.tumblr.com/a943ef66b1ba80fd211fb96b333eb011/5e7104cb65b9b19f-3c/s400x600/76b8ab1496d99e508c69f3b91adaf65077e3ea3e.png', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))

  Zackitty = User(username = 'Zackitty', full_name = 'Zachery Haley', email = 'theelfenliedpictureshow@yahoo.com',
   belt_color = 'Brown', affiliation ='GFTeam', avatar = 'https://64.media.tumblr.com/ed6c711e9bcf78d9e07ed9d49f74a49a/5e7104cb65b9b19f-77/s400x600/1fef80e0b5e89ad70a5d526fdcf0d706994c724a.jpg', encrypted_password=bcrypt.hashpw(
            "onepiece".encode('utf-8'), bcrypt.gensalt(14)))  

  miss_goldenweek = User(username = 'Miss Goldenweek', full_name = 'demo land', email = 'missgoldenweek@demo.com',
   belt_color = 'Black', affiliation ='Checkmat', avatar = 'https://64.media.tumblr.com/3e0c719e439014c6b222de0b6ba8098c/5e7104cb65b9b19f-41/s250x400/7e0acb01126538cec6adeb35272514439aac799f.jpg', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))  

  block1 = Block(user_id = 1, blocked_id = 2)  
  
  block2 = Block(user_id = 1, blocked_id = 3)                 
  db.session.add(demo_user)
  db.session.add(mister_3)
  db.session.add(miss_monday) 
  db.session.add(Zackitty)
  db.session.add(miss_goldenweek)
  db.session.add(block1)
  db.session.add(block2)
  db.session.commit()