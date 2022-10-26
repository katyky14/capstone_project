from app.models import db, Business

def seed_business():
    business1 = Business(
        name = 'Tom San Ramen',
        address = '177 Southgate Ave',
        city = 'South San Sanfrancisco',
        state = 'CA',
        description = 'Ramen, Sushi Bars, Salad',
        owner_id = 1,
        preview_image = 'https://cdn.pixabay.com/photo/2015/05/13/16/16/noodle-soup-765706__340.jpg'

    )

    business2 = Business(
        name = 'Levain Bakery',
        address = '167 W 74th St',
        city = 'New York',
        state = 'NY',
        description = 'Bakeries',
        owner_id = 2,
        preview_image = 'https://cdn.pixabay.com/photo/2016/03/27/21/59/bread-1284438__340.jpg'
    )

    business3 = Business(
        name = 'Lou Malnati Pizzeria',
        address = '439 N Wells St',
        city = 'Chicago',
        state = 'IL',
        description = 'Pizza, Italian, Sandwiches',
        # phone = '3128289800',
        owner_id = 3,
        preview_image = 'https://cdn.pixabay.com/photo/2018/07/09/09/34/pizza-3525673__340.jpg'
    )

    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.commit()

def undo_business():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
