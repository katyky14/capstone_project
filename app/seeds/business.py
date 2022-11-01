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
        preview_image = 'https://assets.epicurious.com/photos/54ad70036529d92b2c046e6b/5:4/w_885,h_708,c_limit/51187270_shoyu-ramen_1x1.jpg',
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
        preview_image = 'https://images.squarespace-cdn.com/content/v1/5e7512146e15fc40b1cc62f6/1585005977913-ZNRX1J0FOIUVK7M8P2AN/15048094_366132853723479_787783103295782912_n.jpg',
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
        preview_image = 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg',
        website = "https://www.loumalnatis.com/chicago-river-north"
    )

    business4 = Business(
        name = 'Kang Ho-dong Baekjeong',
        address = '3465 W 6th St',
        city = 'Los Angeles',
        state = 'CA',
        description = 'Barbeque, Korean',
        phone = '213-384-9678',
        owner_id = 4,
        preview_image = 'https://www.honestfoodtalks.com/wp-content/uploads/2022/03/Korean-bbq-guide-at-restaurants-and-home-grilling.jpg',
        website = "https://www.baekjeongktown.com/"
    )

    business5 = Business(
        name = 'Taqueria Mi Casita',
        address = '2050 N Alma School Rd',
        city = 'Chandler',
        state = 'AZ',
        description = 'Mexican',
        phone = '480-814-7047',
        owner_id = 5,
        preview_image = 'https://assets3.thrillist.com/v1/image/2971271/750x500/flatten;crop;webp=auto;jpeg_quality=50.jpg',
        website = "https://www.taqueriamicasita.com/"
    )

    business6 = Business(
        name = 'Bun Bo Hue An Nam',
        address = '740 Story Rd St',
        city = 'San Jose',
        state = 'CA',
        description = 'Vietnamese, Soup, Pho',
        phone = '408-993-1755',
        owner_id = 5,
        preview_image = 'https://assets3.thrillist.com/v1/image/2971271/750x500/flatten;crop;webp=auto;jpeg_quality=50.jpg',
        website = "https://www.allmenus.com/ca/san-jose/844795-bun-bo-hue-an-nam-2/menu/"
    )

    business7 = Business(
        name = 'Hei La Moon',
        address = '83 Essex St',
        city = 'Boston',
        state = 'MA',
        description = 'Dim Sum, Cantonese',
        phone = '617-338-8813',
        owner_id = 4,
        preview_image = 'http://cdn.cnn.com/cnnnext/dam/assets/160325033254-hk-dim-sum-fook-lam-moon.jpg',
        website = "https://heilamoonma.com/"
    )

    business8 = Business(
        name = 'Stanton City Bites',
        address = '1420 Edwards St',
        city = 'Houston',
        state = 'TX',
        description = 'Burgers, American, Sandwiches',
        phone = '713-227-4893',
        owner_id = 1,
        preview_image = 'https://bigseventravel.com/wp-content/uploads/2019/04/Screenshot-2019-04-28-at-16.24.08.png',
        website = "http://www.stantonscitybites.com/"
    )

    business9 = Business(
        name = 'U:Dessert Story',
        address = '1849 Shattuck Ave',
        city = 'Berkerley',
        state = 'CA',
        description = 'Desserts, Coffee, Tea, Shaved Ice',
        phone = '510-356-4127',
        owner_id = 3,
        preview_image = 'https://i.pinimg.com/originals/33/2a/6f/332a6fb3074f0485a99fcb23e6cd7230.jpg',
        website = "https://udessertstory.com/"
    )

    business10 = Business(
        name = 'Thai Grille',
        address = '15 E College Ave',
        city = 'Westervilee',
        state = 'OH',
        description = 'Thai',
        phone = '614-865-4515',
        owner_id = 2,
        preview_image = 'https://julychoo.com/wp-content/uploads/2020/03/thai.jpg',
        website = "http://thaigrille.blogspot.com/"
    )



    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.add(business4)
    db.session.add(business5)
    db.session.add(business6)
    db.session.add(business7)
    db.session.add(business8)
    db.session.add(business9)
    db.session.add(business10)
    db.session.commit()

def undo_business():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
