from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditProfileForm(FlaskForm):
#   username = StringField("Username", validators=[DataRequired()])
  first_name = StringField("First Name", validators=[DataRequired()])
  last_name = StringField("Last Name", validators=[DataRequired()])
  profile_img = StringField("Profile Image URL")
  bio = StringField("Bio")
  email = StringField("Email", validators=[DataRequired()])
#   gender = StringField("Gender")
