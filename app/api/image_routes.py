from flask import Blueprint, request
from ..models.images import Image, db
from ..forms.images_form import ImageForm

image_routes = Blueprint('images', __name__)


# edit an image
@image_routes.route('<int:id>', methods=['PUT'])
def edit_image(id):
    form = ImageForm()
    print('the form in image', form)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('here inside the form')
        data = Image.query.get(id)
        print('the data', data)
        form.populate_obj(data)
        print('the form after', form)
        db.session.add(data)
        db.session.commit()
        return {"editImage": data.to_dict_images()}

    print('the form errors', form.erros)
    return form.errors


#  delete an image
@image_routes.route('<int:id>', methods=['DELETE'])
def delete_image(id):
    image = Image.query.get(id)
    if image:
        db.session.delete(image)
        db.session.commit()
        return {"message": "Successfully Deleted"}
    return { "message": f"image  doesn't exist"}
