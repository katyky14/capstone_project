from app.models import db, Image

def seed_images():
    image1 = Image(
        image_url = 'https://cdn.pixabay.com/photo/2015/05/13/16/16/noodle-soup-765706__340.jpg',
        user_id = 1,
        business_id = 1
    )
    image2 = Image(
        image_url = 'https://cdn.pixabay.com/photo/2016/03/27/21/59/bread-1284438__340.jpg',
        user_id = 2,
        business_id = 2
    )
    image3 = Image(
        image_url = 'https://cdn.pixabay.com/photo/2018/07/09/09/34/pizza-3525673__340.jpg',
        user_id = 3,
        business_id = 3
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()

    
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
