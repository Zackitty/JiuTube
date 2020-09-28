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
  
  comments = db.relationship("Comment", back_populates="user")
  # created_posts = db.relationship("Post", back_populates="creator")
  # created_threads = db.relationship("Thread", back_populates="creator")

  def to_dict(self):
    # created_post_ids = [
    #   post.id for post in self.created_posts
    # ]
    comments = [comment.id for comment in self.comments ]
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
      # "created_threads": created_thread_ids

    }

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key = True)
  content = db.Column(db.String(255), nullable = False)
  username = db.Column(db.String(255), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  user = db.relationship("User",  back_populates="comments")
  def to_dict(self):

    user = [user.id for user in self.user ]
    return {
      "id": self.id,
      "username": self.username,
      "user": self.user,
      "content": self.content,
    }

# class Thread(db.Model):
#   __tablename__ = 'threads'

#   id = db.Column(db.Integer, primary_key = True)
#   title = db.Column(db.String(100), nullable = False)
#   user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

#   posts = db.relationship("Post", back_populates="thread")
#   creator = db.relationship("User", back_populates="created_threads")
#   def to_dict(self):
#     posts = [post.id for post in self.posts]

#     return {
#       "id": self.id,
#       "title": self.title,
#       "creator": self.user_id,
#       "posts": posts,
#     }

# class Post(db.Model):
#   __tablename__ = 'posts'

#   id = db.Column(db.Integer, primary_key = True)
#   content = db.Column(db.Text, nullable = False)
#   mediaurl = db.Column(db.Text, nullable = True)
#   user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#   thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)

#   def to_dict(self):
#     return {
#       "id": self.id,
#       "content": self.content,
#       "mediaurl": self.mediaurl,
#       "creator": self.user_id,
#       "thread": self.thread_id,
#     }
