from typing import Text
from flask_wtf import FlaskForm
from wtforms import SubmitField,SelectField,TextAreaField,IntegerField
from wtforms.validators import DataRequired,NumberRange


class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id')
    business_id = IntegerField('business_id')
    review = TextAreaField('Write a review', validators=[DataRequired()])
    rating = IntegerField('star', validators=[DataRequired(), NumberRange(min=1,max=5,message="Please give a rating")])
    submit = SubmitField('Add a review')


class EditReviewForm(FlaskForm):
    user_id = IntegerField('user_id')
    business_id = IntegerField('business_id')
    review = TextAreaField('Write a review', validators=[DataRequired()])
    rating = IntegerField('star', validators=[DataRequired(), NumberRange(min=1,max=5,message="Please give a rating")])
    submit = SubmitField('Edit a review')
