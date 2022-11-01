from app.models import business, db, Review, reviews

def seed_reviews():
    review1 = Review(
        user_id = 2,
        business_id = 1,
        rating = 5,
        review = "Excellent Hakata-style Tonkotsu ramen.  This was my first time here but I will be back.  The noodles were the thin kind in a rich tonkotsu broth.  The soft boiled seasoned egg was the standout item for me.  It was perfectly cooked - soft and gooey inside and they gave you a whole egg vs the usual half. The char siu was thinly cut which I like as it makes it easier to eat.  For folks who like spicy, you can tailor the spice level of your broth.The place is small but the service is fast."
    )
    review2 = Review(
        user_id = 3,
        business_id = 1,
        rating = 4,
        review = 'Arrival, Service, Waiting: When we first got here, we learned that the wait would be about an hour or so, and decided to put our name down and walk around the shops. Once our table was ready, we were texted and notified that we had 10 minutes to return. Quickly, we were seated at a table meant for 2 but that they had added an extra place setting to make it a table for 3.'
    )
    review3 = Review(
        user_id = 4,
        business_id = 1,
        rating = 5,
        review = "I've been here with my Dragon Boats team for lunch. It's always such a great hit especially after being on a cold water to get a nice big bowl of Ramen. This time however I was on my own and I just wanted something smaller."
    )
    review4 = Review(
        user_id = 1,
        business_id = 2,
        rating = 4,
        review = 'The chocolate chip walnut was my favorite! I love when cookies have nuts in them and Levain nailed it. The perfect amount of nuts to chocolate ratio AND the cookie was soft and warm. It felt like a hug.'
    )
    review5 = Review(
        user_id = 5,
        business_id = 2,
        rating = 5,
        review = "I wanted to go to another location as I've been to the Williamsburg one a couple of times. I wanted to see if there were any new cookie flavors. I didnt see anything different so now I know that all stores have the same items."
    )
    review6 = Review(
        user_id = 3,
        business_id = 2,
        rating = 5,
        review = "The fact that I have just recently finally tried Levain's cookies is a tragedy!! Realizing that from my location I was at recently was close enough to have them delivered without heading into Manhattan-even better!"
    )
    review7 = Review(
        user_id = 4,
        business_id = 3,
        rating = 5,
        review = "The pizza was amazing!!!! The 'thin' crust wasn't what I thought of as thin, but it was incredible! It had a perfect crunchiness & the dough in the crust made the whole pizza! It was very slightly salty and had a fabulous flavor!"
    )
    review8 = Review(
        user_id = 2,
        business_id = 3,
        rating = 5,
        review = "The vibe was chill and you could tell everyone was enjoying themselves! It's a cool place for groups or couples and if you're up to watching a game or two...it's a great place to sit and eat some pizza! Now..be prepared to wait an hour if you want the Deep dish because it is truly deep but it's worth it!"
    )
    review10 = Review(
        user_id = 5,
        business_id = 3,
        rating = 3,
        review = "Decided to come check out this Chicago staple when I was in town with my girlfriend. I was so excited to try it out, but when I received the pizza to-go and took a bite when it was still piping hot, I didn't think it was the awe inducing experience I hoped for. The pizza was just ok and didn't have the orgasmic symphony of flavors I was looking for. I really enjoyed the food I had in Chicago, and it was disappointing I didn't get that receive it from this establishment."
    )
    review11 = Review(
        user_id = 1,
        business_id = 4,
        rating = 5,
        review = "A classic ktown spot for kbbq. I usually get the beef combo here, but opted for pork instead last night for dinner. Beef usually cooks faster whereas pork takes longer if you want the pieces to be crispy, so keep that in mind with how hungry you are. They cook for you here, but be prepared for stinging eyes and smelly clothes/hair because their exhaust fans used to suck the smoke don't work super well here."
    )
    review12 = Review(
        user_id = 3,
        business_id = 4,
        rating = 4,
        review = "The space at the tables are on the small side and I wasn't expecting the servers to cook the food for us but they did. I feel the portion size/price was decent but not great. We got the beef combo. I would have hoped there were more different selections on the menu but at least the quality of the meat was solid."
    )
    review13 = Review(
        user_id = 5,
        business_id = 4,
        rating = 5,
        review = "Korean BBQ at its finest!! This place is a bit more expensive than other locations you can find, however the service and the quality is unmatched. The brisket is mouth watering, rib eye juicy, and the marinated beef is to die for. But the real treasure for me was the pork belly!! So mouth watering."
    )
    review14 = Review(
        user_id = 1,
        business_id = 5,
        rating = 5,
        review = "Top notch taco joint! Place was pretty crowded when we arrived for lunch. The line moved quickly. I opted for Carne Asada and Al Pastor. Both were very flavorful. The food is pipping hot as it is made right in front of you. The menu has quite a bit from which to pick. The salsas was also very good. Range of options - spicy to mild."
    )
    review15 = Review(
        user_id = 2,
        business_id = 5,
        rating = 5,
        review = "It's all about the beans and these frijoles are on fire! They are the loveliest legumes I've had outside of Mexico."
    )
    review16 = Review(
        user_id = 3,
        business_id = 5,
        rating = 3,
        review = "I enjoyed the street taco shells and the toppings for the tacos. What I didn't enjoy is the chicken taco didn't have any flavor at all and the carne and carnitas meats were very chewy. It was difficult for me to chew and hurt my jaw.  I'm used to tacos having tender meats so this texture was new for me."
    )
    review17 = Review(
        user_id = 4,
        business_id = 6,
        rating = 5,
        review = "We went here for dinner the other night on recommendation from a local friend and she said that this is the place to go for some good Bun Bo Hue. Pho is the more glamorized/popular Vietnamese dish but BBH deserves some love and attention too so I was happy to go and check it out. "
    )
    review18 = Review(
        user_id = 3,
        business_id = 6,
        rating = 5,
        review = "The bun bo hue was so delicious and it was full of amazing flavor. The spice was not bad at all and it was perfect for my spice tolerance haha. The meat was also tender and full of flavor. Personally, after trying bun bo hue, I think I might prefer it over pho!"
    )
    review19 = Review(
        user_id = 5,
        business_id = 7,
        rating = 3,
        review = "Food itself was pretty good. Normal dim sum quality. But seemed like the food upstairs just wasn't as fresh for some reason."
    )
    review20 = Review(
        user_id = 1,
        business_id = 7,
        rating = 5,
        review = "This place is huge! I think they recently changed locations in Chinatown but there is so much space for all different size groups. I went relatively early for dinner on a Monday night so service was quick but I can see this place getting extremely busy around peak dinner time."
    )
    review21 = Review(
        user_id = 3,
        business_id = 8,
        rating = 5,
        review = "The burger had great structural integrity. It did not fall apart when I ate it. The burger itself was juicy, cooked perfectly, and had the perfect proportion of toppings. Overall, a great value for the price. I will definitely be back!"
    )
    review22 = Review(
        user_id = 2,
        business_id = 8,
        rating = 3,
        review = "I really wanted to love this place so much . I debated on getting it a hundred times . Well I tried a new nail place close by so I took the opportunity to stop in and pick it up to go .. I ate the burger in the car lol I was so excited to try it .."
    )
    review23 = Review(
        user_id = 5,
        business_id = 9,
        rating = 5,
        review = "The place was amazing! Great place to go after a small dinner if you're wanting dessert. I got the Volcano Bingsoo; one of the most delicious desserts I've had!"
    )
    review24 = Review(
        user_id = 4,
        business_id = 9,
        rating = 5,
        review = "I am not exaggerating when I say the bingsoo here is life changing. I never had shaved ice that just melts in your mouth. It was like eating snow flakes ! I never want to go to another bingsoo  place again after coming here."
    )
    review25 = Review(
        user_id = 3,
        business_id = 10,
        rating = 5,
        review = "My friend and I both ordered medium spice but I only tasted a hint of spice in hers, while mine tasted like they maybe forgot to add some. The food was delicious and like some reviews said, not a large portion as other Thai places. It's a sizeable amount that you can finish easily if you're really hungry."
    )
    review26 = Review(
        user_id = 1,
        business_id = 10,
        rating = 5,
        review = "We stopped by Thai Grille for a birthday dinner. The restaurant is small and modest, with just a single waiter and cook. The owner warned us about being short-staffed, so it didn't come as much of a surprise."
    )

    # missing number 9

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
