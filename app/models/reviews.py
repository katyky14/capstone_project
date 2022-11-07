from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Review(db.Model):
    __tablename__ = 'reviews'
    if environment == "production":
      __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')), nullable=True)
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
            # "users": [u.to_dict_user_rel() for u in self.users],
            "business": self.business.to_dict_business(),

        }
