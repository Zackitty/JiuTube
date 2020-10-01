from app.models import User
from app import app, db
from dotenv import load_dotenv
import bcrypt
load_dotenv()
with app.app_context():
  db.drop_all()
  db.create_all()

  demo_user = User(username = 'Demo', full_name = 'demo land', email = 'demo@demo.com',
   belt_color = 'White', affiliation ='Creonte', avatar = 'https://jiutube.s3.us-east-2.amazonaws.com/Igaram_Anime_Pre_Timeskip_Infobox.png', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))

  mister_3 = User(username = 'Mr 3', full_name = 'demo land', email = 'mister3@demo.com',
   belt_color = 'White', affiliation ='Gracie Barra', avatar = 'https://jiutube.s3.us-east-2.amazonaws.com/Galdino_Anime_Infobox.png', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))

  miss_monday = User(username = 'Miss Monday', full_name = 'demo land', email = 'missmonday@demo.com',
   belt_color = 'Blue', affiliation ='Alliance', avatar = 'https://jiutube.s3.us-east-2.amazonaws.com/miss+monday.png', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))

  Zackitty = User(username = 'Zackitty', full_name = 'Zachery Haley', email = 'theelfenliedpictureshow@yahoo.com',
   belt_color = 'Black', affiliation ='GFTeam', avatar = 'https://jiutube.s3.us-east-2.amazonaws.com/75540036_10163916409385354_7059600026032406528_n.jpg', encrypted_password=bcrypt.hashpw(
            "onepiece".encode('utf-8'), bcrypt.gensalt(14)))  

  miss_goldenweek = User(username = 'Miss Goldenweek', full_name = 'demo land', email = 'missgoldenweek@demo.com',
   belt_color = 'Black', affiliation ='Checkmat', avatar = 'https://jiutube.s3.us-east-2.amazonaws.com/miss+goldenweek.jpg', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))          

  db.session.add(mister_3)
  db.session.add(miss_monday) 
  db.session.add(Zackitty)
  db.session.add(miss_goldenweek)
  db.session.commit()