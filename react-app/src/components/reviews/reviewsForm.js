import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusinessThunk } from "../../store/business";
import { addOneReviewThunk } from "../../store/reviews";




function CreateReview({ setShowModal, businessId }) {
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const valErrors = [];

        if (stars === 0) valErrors.push("Star rating is required");
        if (review.length === 0) valErrors.push("Review cannot be empty")
        await setErrors(valErrors)

        const reviewInformation = {
            "review": review,
            "rating": +stars,
            businessId
        }

        if (review.length > 0 && stars > 0) {
            await dispatch(addOneReviewThunk(reviewInformation))
            await dispatch(getAllBusinessThunk())
            setShowModal(false)
        }


    }


    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add Review</h2>
            </div>

            <div>
                <input
                    type='checkbox'
                    id="rate5"
                    name="stars"
                    value={5}
                    onChange={e => setStars(e.target.value)}
                    checked={+stars >= 5 ? true : false}
                />
                <label htmlFor="rate5">&#9733;</label>

                <input
                    type='checkbox'
                    id="rate4"
                    name="stars"
                    value={4}
                    onChange={e => setStars(e.target.value)}
                    checked={+stars >= 4 ? true : false}
                />
                <label htmlFor="rate4">&#9733;</label>

                <input
                    type='checkbox'
                    id="rate3"
                    name="stars"
                    value={3}
                    onChange={e => setStars(e.target.value)}
                    checked={+stars >= 3 ? true : false}
                />
                <label htmlFor="rate3">&#9733;</label>

                <input
                    type='checkbox'
                    id="rate2"
                    name="stars"
                    value={2}
                    onChange={e => setStars(e.target.value)}
                    checked={+stars >= 2 ? true : false}
                />
                <label htmlFor="rate2">&#9733;</label>

                <input
                    type='checkbox'
                    id="rate1"
                    name="stars"
                    value={1}
                    onChange={e => setStars(e.target.value)}
                    checked={+stars >= 1 ? true : false}
                />
                <label htmlFor="rate1">&#9733;</label>
            </div>


            <div>
                <label htmlFor="review"></label>
                <textarea
                rows="5"
                cols="51"
                value={review}
                placeholder="Review here Remember to look at the yelp one"
                onChange={e => setReview(e.target.value)}
                >
                </textarea>
            </div>


            <div>
                {errors.map((error, idx) => (
                    <div key={idx}>{error} </div>
                ))}
            </div>

            <button type="submit">Submit Review</button>

        </form>

    )


}

export default CreateReview;
