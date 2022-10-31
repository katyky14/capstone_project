from app.models import db, Business

def seed_business():
    business1 = Business(
        name = 'Marufuku Ramen',
        address = '1581 Webtster St',
        city = 'San Francisco',
        state = 'CA',
        description = 'Ramen, Sushi Bar, Udon',
        phone= '415-872-9786',
        owner_id = 1,
        preview_image = 'https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg',
        website = "https://www.marufukuramen.com/"
    )

    business2 = Business(
        name = 'Levain Bakery',
        address = '167 W 74th St',
        city = 'New York',
        state = 'NY',
        description = 'Bakeries',
        phone = '917-464-3769',
        owner_id = 2,
        preview_image = 'https://cdn.pixabay.com/photo/2016/03/27/21/59/bread-1284438__340.jpg',
        website = "https://levainbakery.com/pages/west-74th-street"
    )

    business3 = Business(
        name = 'Lou Malnati Pizzeria',
        address = '439 N Wells St',
        city = 'Chicago',
        state = 'IL',
        description = 'Pizza, Italian, Sandwiches',
        phone = '312-828-9800',
        owner_id = 3,
        preview_image = 'https://cdn.pixabay.com/photo/2018/07/09/09/34/pizza-3525673__340.jpg',
        website = "https://www.loumalnatis.com/chicago-river-north"
    )

    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.commit()

def undo_business():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
