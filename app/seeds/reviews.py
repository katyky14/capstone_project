from app.models import business, db, Review, reviews

def seed_reviews():
    review1 = Review(
        user_id = 3,
        business_id = 1,
        rating = 5,
        review = 'The ramen broth was really good! Highly recommended'
    )
    review2 = Review(
        user_id = 2,
        business_id = 3,
        rating = 4,
        review = 'Everything looks delicious! I got slices of bread tasted fresh!'
    )
    review3 = Review(
        user_id = 1,
        business_id = 2,
        rating = 5,
        review = 'The cheese on the pizza was on point! My fav was pepperoni'
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()

