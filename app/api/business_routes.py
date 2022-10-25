
from app.forms.review_form import ReviewForm
from flask import Blueprint, request
from flask_login import current_user


from app.forms.images_form import ImageForm
from ..forms.business_form import BusinessForm, EditBusinessForm
from ..forms.review_form import ReviewForm
from ..models import Business, Image, db, Review


business_routes = Blueprint('business', __name__)

# Get all business
@business_routes.route('/')
def get_all_businesses():
    all_businesses = Business.query.join(Image).all()
    return {'business': [business.to_dict_relationship() for business in all_businesses]}

# Get business by id
@business_routes.route('/<int:id>')
def get_business_id(id):
    one_business = Business.query.get(id)
    return {'oneBusiness': one_business.to_dict_relationship()}


# get the current user/owner businesses

# create a new business
@business_routes.route('', methods=['POST'])
def create_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Business()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return {'business': data.to_dict_relationship()}

    return form.errors

#edit a business
@business_routes.route('/<int:id>', methods=['PUT'])
def edit_business(id):
    form = EditBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Business.query.get(id)
        form.populate_ob(data)
        db.session.add(data)
        db.session.commit()
        return {'editedBusiness': data.to_dict_relationship()}

    return form.errors


# add images to the business
@business_routes.route('/<int:business_id>/images', methods=['POST'])
def add_images_to_business(business_id):
    form = ImageForm()
    user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Image (
            user_id = user['id'],
            business_id = business_id,
            image_url= form.data['image_url']
        )
        db.session.add(data)
        db.session.commit()
        return {"newImage": data.to_dict_images()}

    return form.errors

# delete a business
@business_routes.route('/<int:id>', method=['DELETE'])
def delete_business(id):
    selected_business = Business.query.get(id)
    if selected_business:
        db.session.delete(selected_business)
        db.session.commit()
        return { "message": "Successfully Deleted"}

    return { "message": "This Business does not exist"}


#add a review for a business
@business_routes.route('/<int:business_id>/reviews', method=['POST'])
def add_review(business_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user.to_dict()
        data = Review (
            user_id = user['id'],
            business_id = business_id,
            rating = form.data['rating'],
            review = form.data['review']
        )
        db.session.add(data)
        db.session.commit()
        return  { "review": data.to_dict_reviews()}

    return form.errors
