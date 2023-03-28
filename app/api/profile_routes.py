from flask import Blueprint, request
from app.models import db, User, Business
from app.forms.edit_profile_form import EditProfileForm
from flask_login import login_required, current_user

profile_routes = Blueprint('profile', __name__)


# get user profile

@profile_routes.route('/<int:userId>')
def profile_page(userId):
    user_profile = User.query.get_or_404(userId)

    profile = user_profile.to_dict()
    #print('the user profile in --------', profile)

    all_businesses = Business.query.filter(Business.owner_id == userId).all()
    businesses = [business.to_dict_business() for business in all_businesses]

    res = {
        'profile': profile,
        'businesses': businesses
    }

    return res


# edit profile
@profile_routes.route('/edit/<int:userId>', methods=['PUT'])
@login_required
def edit_profile(userId):
    edit_form = EditProfileForm()
    user_profile = User.query.get_or_404(userId)

    if not user_profile:
        return {'message': 'Profile does not exist', 'statusCode': '403'}, 403

    edit_form['csrf_token'].data = request.cookies['csrf_token']
    # if edit_form.validate_on_submit():

    if userId == current_user.id:
        user_profile.first_name = edit_form.data['first_name']
        user_profile.last_name = edit_form.data['last_name']
        # user_profile.gender = edit_form.data['gender']
        # user_profile.bio = edit_form.data['bio']
        user_profile.icon_img = edit_form.data['icon_img']

        db.session.commit()
        return user_profile.to_dict()
