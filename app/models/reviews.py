from .db import db
from datetime import date

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(500), nullable=False)
    
    users = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')
    # images = db.relationship('Image', back_populates='reviews')


    def to_dict_reviews(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "businessId": self.business_id,
            "rating": self.rating,
            "review": self.review
        }

    def to_dict_rel(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "businessId": self.business_id,
            "rating": self.rating,
            "review": self.review,
            "users": self.users.to_dict(),
            "business": self.business.to_dict_business(),

        }
