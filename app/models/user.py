from app.models import business
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)

    hashed_password = db.Column(db.String(255), nullable=False)
    business = db.relationship('Business', back_populates='owner', cascade='all, delete')
    images = db.relationship('Image', back_populates='users', cascade='all, delete')
    reviews = db.relationship('Review', back_populates='users', cascade='all, delete')

    icon_img = db.Column(db.String(500))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            "iconImg": self.icon_img
        }

    def to_dict_user_rel(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'business': [b.to_dict_business() for b in self.business],
            'userImages': [i.to_dict_images() for i in self.images],
            "reviews": [r.to_dict_reviews() for r in self.reviews],
            'iconImg': self.icon_img
        }
