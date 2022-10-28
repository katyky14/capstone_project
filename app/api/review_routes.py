from app.forms.review_form import EditReviewForm, ReviewForm
from flask import Blueprint, request
from flask_login import current_user

from ..models import Review, db

review_routes = Blueprint('reviews', __name__)

#Get all reviews from current user
@review_routes.route('/current')
def get_all_reviews_user():
    if current_user.is_authenticated:
        user = current_user.to_dict()
        all_reviews = Review.query.filter(Review.user_id == user['id'])
        return { "review": [review.to_dict_reviews() for review in all_reviews]}

    return {"message": "no user logged in"}

# edit a review based on the business id
@review_routes.route('/<int:id>', methods=['PUT'])
def edit_review(id):
    form = ReviewForm()  #in the other we used ReviewForm()
    review = Review.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.review = form.data['review']
        review.rating = form.data['rating']
        db.session.commit()
        return { "editedReview": review.to_dict_reviews()}

    return form.errors


# delete a review
@review_routes.route('<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        # return {"id": review.to_dict_reviews().id}
        return {"message": "Successfully deleted"}


    return {"errorMessage": "this review does not exist"}
