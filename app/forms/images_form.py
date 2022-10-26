from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def validUrl(form, field):
    url = field.data
    if('jpg' or 'png' or 'jpeg' or 'gif') not in url:
        raise ValidationError('Must be a valid url jpg, png, or gif')

class ImageForm(FlaskForm):
    image_url = StringField('image_url', validators=[DataRequired(), validUrl])





# (!imgUrl.match(/\.(jpg|jpeg|png|gif)$/))
# regex = “([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)”
# FileField('Header Image', validators=[FileAllowed(['jpg', 'png'])])
# https://pythonhosted.org/Flask-WTF/form.html --- aws form validators
