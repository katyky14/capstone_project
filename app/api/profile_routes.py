from flask import Blueprint, request
from app.models import db, User, Business
from app.forms.edit_profile_form import EditProfileForm
from flask_login import login_required, current_user

profile_routes = Blueprint('profile', __name__)
