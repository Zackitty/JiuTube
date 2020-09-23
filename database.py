from app.models import User
from app import app, db
from dotenv import load_dotenv
import bcrypt
load_dotenv()
with app.app_context():
  db.drop_all()
  db.create_all()

  demo_user = User(username = 'Demo', full_name = 'demo land', email = 'demo@demo.com',
   belt_color = 'white', affiliation ='none', avatar = '', encrypted_password=bcrypt.hashpw(
            "password".encode('utf-8'), bcrypt.gensalt(14)))


  db.session.add(demo_user)
  db.session.commit()