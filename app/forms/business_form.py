from tokenize import String
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, validators, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError

def validUrl(form, field):
    url = field.data
    if('jpg' or 'png' or 'jpeg' or 'gif') not in url:
        raise ValidationError('Must be a valid url jpg, jpeg, png, or gif')


TYPES = [
    ('bakeries', 'Bakeries'),
    ('bobatea', 'Boba Tea'),
    ('desserts', 'Desserts'),
    ('dimsum', 'Dim Sum'),
    ('burgers', 'Burgers'),
    ('korean', 'Korean'),
    ('american', 'American'),
    ('ramen', 'Ramen'),
    ('pho', 'Pho'),
    ('noodles', 'Noodles'),
    ('pizza', 'Pizza'),
    ('sandwich', 'Sandwich'),
    ('tacos', 'Tacos'),
    ('chinese', 'Chinese'),
]


class BusinessForm(FlaskForm):
    name = StringField('Business Name', validators=[DataRequired(), validators.Length(min=1, max=50, message='Name must be between 2 to 50 characters')])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    phone = StringField('Phone Number', validators=[DataRequired(), validators.Length(min=12, max=12, message="Phone must be 10 characters")])
    description = TextAreaField('Description', validators=[DataRequired(), validators.Length(min=4, max=500, message="Description must be between 4 to 500 characters")])
    preview_image = StringField('PreviewImage', validators=[DataRequired()])
    website = StringField('Website', validators=[DataRequired()])
    owner_id = IntegerField('Owner Id')
    # types = SelectMultipleField('Categories (select up to 3)', choices=TYPES)
    submit = SubmitField('Add Business')



class EditBusinessForm(FlaskForm):
    name = StringField('Business Name', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    phone = StringField('Phone Number', validators=[DataRequired(), validators.Length(min=12, max=12, message="Phone must be 10 characters")])
    description = TextAreaField('Description', validators=[DataRequired()])
    preview_image = StringField('PreviewImage', validators=[DataRequired()])
    website = StringField('Website', validators=[DataRequired()])
    owner_id = IntegerField('Owner Id')
    # types = SelectMultipleField('Categories (select up to 3)', choices=TYPES)
    submit = SubmitField('Edit Business')


# (!imgUrl.match(/\.(jpg|jpeg|png|gif)$/))
# regex = “([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)”
# FileField('Header Image', validators=[FileAllowed(['jpg', 'png'])])
# https://pythonhosted.org/Flask-WTF/form.html --- aws form validators
