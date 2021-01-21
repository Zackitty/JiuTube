from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
#

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  full_name = db.Column(db.String(40), nullable = False, unique = False)
  encrypted_password = db.Column(db.LargeBinary, nullable=False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  belt_color = db.Column(db.String(40), nullable = False)
  affiliation = db.Column(db.String(100), nullable = True)
  avatar = db.Column(db.String(255), nullable = True)
  
  blocks = db.relationship('Block', back_populates="user")
  comments = db.relationship("Comment", back_populates="user")
  # created_posts = db.relationship("Post", back_populates="creator")
  # created_threads = db.relationship("Thread", back_populates="creator")

  def to_dict(self):
    # created_post_ids = [
    #   post.id for post in self.created_posts
    # ]
    comments = [comment.id for comment in self.comments ]
    blocks = [block.id for block in self.blocks]
    # created_thread_ids = [thread.id for thread in self.created_threads]
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "full_name": self.full_name,
      "email": self.email,
      "belt_color": self.belt_color,
      "affiliation": self.affiliation,
      "avatar": self.avatar,
      # "created_posts": created_post_ids,
      "comments": comments,
      "blocks": blocks
      # "created_threads": created_thread_ids

    }

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key = True)
  content = db.Column(db.String(255), nullable = False)
  username = db.Column(db.String(255), nullable = False)
  avatar = db.Column(db.String(255), nullable= True)
  belt_color = db.Column(db.String(255), nullable =True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  user = db.relationship("User",  back_populates="comments")
  def to_dict(self):

    return {
      "id": self.id,
      "content": self.content,
      "username": self.username,
      "avatar": self.avatar,
      "belt_color": self.belt_color,
      "user": self.user_id
      h
    }

class Block(db.Model):
    __tablename__ = 'blocks'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    blocked_id = db.Column(db.Integer, nullable=False)
    user = db.relationship("User",  back_populates="blocks")

    def to_dict(self):

      return {
        "id": self.id,
        "user": self.user_id,
        "block": self.blocked_id
    }
