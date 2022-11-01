from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='User', password='password')
    vayne = User(
        username='Vayne', email='vayne@aa.io',first_name='Vayne', last_name='Shauna', password='password')
    sona = User(
        username='Sona', email='sona@aa.io', first_name='Sona', last_name='Buvelle', password='password')
    lux = User(
        username='Lux', email='lux@aa.io', first_name='Lux', last_name='Crownguard', password='password')
    morgana = User(
        username='Morgana', email='morgana@aa.io', first_name='Morgana', last_name='Hex', password='password')




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
