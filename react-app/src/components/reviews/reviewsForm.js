import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusinessThunk, getOneBusinessThunk } from "../../store/business";
import { addOneReviewThunk } from "../../store/reviews";

import './reviewFrom.css'


function CreateReview({ setShowModal, businessId }) {
    const dispatch = useDispatch();

    console.log('the business id in create review', businessId)
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const valErrors = [];

        if (stars === 0) valErrors.push("Star rating is required");
        if (review.length === 0) valErrors.push("Review cannot be empty")
        if (review.length < 5 || review.length > 1000) valErrors.push("Review must be between 5 to 1000 characters")
        await setErrors(valErrors)

        const reviewInformation = {
            "review": review,
            "rating": +stars,
            businessId
        }

        if (review.length > 0 && stars > 0) {
            await dispatch(addOneReviewThunk(reviewInformation))
            // await dispatch(getAllBusinessThunk())
            await dispatch(getOneBusinessThunk(businessId))
            setShowModal(false)
        }


    }


    return (



        <form onSubmit={onSubmit} className="review-form">
            <div className='review-form-header'>
                {/* <i className="fas fa-times cancel-button" onClick={() => setShowModal(false)} /> */}
                <h2 className='review-title'>Add your review</h2>
            </div>
            <div className='star-container'>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r5"
                    name="stars"
                    value={5}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 5 ? true : false}
                    />
                <label className='star-label' htmlFor="r5">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r4"
                    name="stars"
                    value={4}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 4 ? true : false}
                    />
                <label className='star-label' htmlFor="r4">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r3"
                    name="stars"
                    value={3}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 3 ? true : false}
                    />
                <label className='star-label' htmlFor="r3">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r2"
                    name="stars"
                    value={2}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 2 ? true : false}
                    />
                <label className='star-label' htmlFor="r2">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r1"
                    name="stars"
                    value={Number(1)}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 1 ? true : false}
                    />
                <label className='star-label' htmlFor="r1">&#9733;</label>
            </div>
            <div className='review-div'>
                <label htmlFor="review" />
                <textarea
                    className='review-textbox'
                    rows="5"
                    cols="51"
                    value={review}
                    placeholder="Type Review here"
                    onChange={(e) => setReview(e.target.value)}>
                </textarea>
            </div>
            <div className='review-errors-div'>
                {errors.map((error, idx) => (
                    <p key={idx} >{error}</p>
                    ))}
            </div>
            <button className='Submit-Review' type="submit">Submit Review</button>
        </form>

)


}

export default CreateReview;
{/* <div>
    <input
    className="star-inputs"
        type='checkbox'
        id="rate5"
        name="stars"
        value={5}
        onChange={e => setStars(e.target.value)}
        checked={+stars >= 5 ? true : false}
    />
    <label htmlFor="rate5">&#9733;</label>

    <input
     className="star-inputs"
        type='checkbox'
        id="rate4"
        name="stars"
        value={4}
        onChange={e => setStars(e.target.value)}
        checked={+stars >= 4 ? true : false}
    />
    <label htmlFor="rate4">&#9733;</label>

    <input
     className="star-inputs"
        type='checkbox'
        id="rate3"
        name="stars"
        value={3}
        onChange={e => setStars(e.target.value)}
        checked={+stars >= 3 ? true : false}
    />
    <label htmlFor="rate3">&#9733;</label>

    <input
     className="star-inputs"
        type='checkbox'
        id="rate2"
        name="stars"
        value={2}
        onChange={e => setStars(e.target.value)}
        checked={+stars >= 2 ? true : false}
    />
    <label htmlFor="rate2">&#9733;</label>

    <input
     className="star-inputs"
        type='checkbox'
        id="rate1"
        name="stars"
        value={1}
        onChange={e => setStars(e.target.value)}
        checked={+stars >= 1 ? true : false}
    />
    <label htmlFor="rate1">&#9733;</label>
</div>
*/}