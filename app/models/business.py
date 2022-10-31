from .db import db


class Business(db.Model):
    __tablename__ = 'businesses'
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    preview_image = db.Column(db.String(500), nullable=False)
    website = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship('User', back_populates='business')
    images = db.relationship('Image', back_populates ='business')
    reviews = db.relationship('Review', back_populates='business', cascade='all, delete')

    def to_dict_business(self):
        return {
          "id": self.id,
          "ownerId": self.owner_id,
          "name": self.name,
          "description": self.description,
          "address": self.address,
          "city": self.city,
          "state": self.state,
          "phone": self.phone,
          "previewImage": self.preview_image,
          "website": self.website

        }

    def to_dict_relationship(self):
        return {
          "id": self.id,
          "ownerId": self.owner_id,
          "name": self.name,
          "description": self.description,
          "address": self.address,
          "city": self.city,
          "state": self.state,
          "phone": self.phone,
          "owner": self.owner.to_dict(),
          "previewImage": self.preview_image,
          "website": self.website,
          "images": [i.to_dict_images() for i in self.images],
          "reviews": [r.to_dict_reviews() for r in self.reviews]
        }
