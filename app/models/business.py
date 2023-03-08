from .db import db, environment, SCHEMA, add_prefix_for_prod

business_types = db.Table(
  'business_type',
  db.Model.metadata,
  db.Column('business_id', db.Integer, db.ForeignKey('businesses.id'), primary_key=True),
  db.Column('type_id', db.Integer, db.ForeignKey('types.id'), primary_key=True)
)

class Business(db.Model):
    __tablename__ = 'businesses'
    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    preview_image = db.Column(db.String(500), nullable=False)
    website = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship('User', back_populates='business')
    images = db.relationship('Image', back_populates ='business')
    reviews = db.relationship('Review', back_populates='business', cascade='all, delete')

    types = db.relationship(
      'Type',
      secondary=business_types,
      back_populates='businesses'
    )


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
          # "reviews": [r.to_dict_reviews() for r in self.reviews]
          "reviews": [r.to_dict_rel() for r in self.reviews]
        }

class Type(db.Model):
  __tablename__ = "types"

  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String(500))
  alias = db.Column(db.String(500))

  businesses = db.relationship(
    'Business',
    secondary=business_types,
    back_populates='types'
  )

  def to_dict(self):
    return {
      "id": self.id,
      "type": self.type,
      "alias": self.alias
    }
