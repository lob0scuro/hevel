from app.extensions import db, bcrypt
from flask_login import UserMixin
from sqlalchemy import func


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    username = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    posts = db.relationship('Post', backref="author", lazy=True)
    
    def set_password(self, raw_password):
        #hashes a plaintext password and stores it
        self.password = bcrypt.generate_password_hash(raw_password).decode('utf-8')
        
    def check_password(self, raw_password):
        #verifies a plaintext password against the hashed password
        return bcrypt.check_password_hash(self.password, raw_password)
    
    def __repr__(self):
        return f"<User {self.id}: {self.firstName} {self.lastName}>"
    
    
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    subtitle = db.Column(db.String(50))
    content = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    created_on = db.Column(db.Date, default=func.current_date())
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "content": self.content,
            "image_url": self.image_url,
            "create_on": self.created_on,
            "author": self.author,
            "category_id": self.category_id
        }
    
    def __repr__(self):
        return f"<Post {self.id}: {self.title} // {self.created_on}>"
    
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    posts = db.relationship('Post', backref="category", lazy=True)
    
    def __repr__(self):
        return f"<Category {self.id}: {self.name}>"
