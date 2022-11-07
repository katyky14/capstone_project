
from app.models import business
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'
    if environment == "production":
      __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, nullable=False, primary_key=True)
    image_url = db.Column(db.String, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')), nullable=True)

    business = db.relationship('Business', back_populates='images')
    users = db.relationship('User', back_populates='images')
    # review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'), nullable=True)
    # reviews = db.relationship('Review', back_populates='images')

    def to_dict_images(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "businessId": self.business_id,
            "imageUrl": self.image_url
        }

    def to_dict_images_rel(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "businessId": self.business_id,
             "imageUrl": self.image_url,
            "users": self.users.to_dict(),
            "business": self.business.to_dict_business(),
            # "reviews": self.reviews.to_dict_reviews()
        }
