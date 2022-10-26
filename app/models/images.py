
from app.models import business
from .db import db

class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    image_url = db.Column(db.String, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=True)
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
            "previewImage": self.preview_image,
            "users": self.users.to_dict(),
            "business": self.business.to_dict_business(),
            # "reviews": self.reviews.to_dict_reviews()
        }
