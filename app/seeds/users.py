from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        first_name='Demo',
        last_name='User',
        password='password',
        icon_img = "https://www.mobafire.com/images/avatars/summoner-icon-champie-teemo.png"
        )
    vayne = User(
        username='Vayne',
         email='vayne@aa.io',
         first_name='Vayne',
         last_name='Shauna',
         password='password',
         icon_img ='https://pbs.twimg.com/media/DbuusclU8AAktbI.jpg'
         )
    sona = User(
        username='Sona',
        email='sona@aa.io',
        first_name='Sona',
        last_name='Buvelle',
        password='password',
        icon_img ='https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8c7c87802cd13cf9/5efbadf5c1c3440e1d54d193/shio_shoujo_icon.png'
        )
    lux = User(
        username='Lux',
        email='lux@aa.io',
        first_name='Lux',
        last_name='Crownguard',
        password='password',
        icon_img = "https://cdn.lolalytics.com/generated/champion280px/lux.jpg"
        )
    morgana = User(
        username='Morgana',
        email='morgana@aa.io',
        first_name='Morgana',
        last_name='Hex',
        password='password',
        icon_img = "https://i.pinimg.com/474x/30/02/92/300292d4394daad7b1cedbafd6ddc975.jpg"
        )




    db.session.add(demo)
    db.session.add(sona)
    db.session.add(vayne)
    db.session.add(lux)
    db.session.add(morgana)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
