import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessThunk, getOneBusinessThunk } from "../../store/business";
import { editTheReviewThunk } from "../../store/reviews";


import './reviewFrom.css'


function EditReviewForm({ setShowModal, business}) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    console.log('the user', user)

    const businessReview = business.reviews.find(review => review.userId === user.id)

    const [review, setReview] = useState(businessReview.review)
    const [stars, setStars] = useState(businessReview.rating);
    const [validationErrors, setValidationErrors] = useState([]);


    const onSubmit = async (e) => {
        e.preventDefault();

        // const errors = [];
        // if (stars === 0) errors.push("Stars rating is required");
        // if (review.length === 0) errors.push("Review cannot be empty");
        // if (review.length < 5 || review.length > 1000) errors.push("Review must be between 5 to 1000 characters")
        // await setValidationErrors(errors);


        const reviewInfo = {
            "review": review,
            "rating": +stars,
            "reviewId": businessReview.id
        }


        if (review.length > 0 && stars > 0) {
            await dispatch(editTheReviewThunk(reviewInfo))
            // await dispatch(getAllBusinessThunk())
            await dispatch(getOneBusinessThunk(business.id))
            setShowModal(false)
        }

    }


    useEffect(() => {
        const errors = [];
        if (stars === 0) errors.push("Stars rating is required");
        if (review.length === 0) errors.push("Review cannot be empty");
        if (review.length < 5 || review.length > 1000) errors.push("Review must be between 5 to 1000 characters")
        setValidationErrors(errors);
    }, [review, stars])

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
                {validationErrors.map((error, idx) => (
                    <p key={idx} >{error}</p>
                    ))}
            </div>
            <button className='Submit-Review' type="submit" disabled={validationErrors.length > 0}>Submit Review</button>
        </form>

    )





}


export default EditReviewForm;
