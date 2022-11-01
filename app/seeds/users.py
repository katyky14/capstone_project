from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='User', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', first_name='Marnie', last_name='Li', password='password')
    vayne = User(
        username='vayne', email='vayne@aa.io',first_name='Vayne', last_name='Shauna', password='password')
    lux = User(
        username='lux', email='lux@aa.io', first_name='Lux', last_name='Crownguard', password='password')




    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(vayne)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
