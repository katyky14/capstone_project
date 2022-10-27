import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneBusinessThunk } from "../../store/business";
import { addOneReviewThunk, getBusinessReviewThunk } from "../../store/reviews";



function ReviewForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();


    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [show, setShow] = useState(false);
    const [validationErrors, setValidationErrors] = useState([])

    const updateReviews = e => setReview(e.target.value);
    const updateStars = e => setStars(e.target.value);

    const businessObj = useSelector(state => state.businessState)
    console.log('the businesObj', businessObj);

    const businesArr = Object.values(businessObj);
    console.log('the buz arr', businesArr);

    const reviewObj = useSelector(state => state.reviewState)
    console.log('the review obj', reviewObj)

    const reviewArr = Object.values(reviewObj);
    console.log('the review arr', reviewArr)

    const userRev = useSelector(state => state.session.user)
    console.log('the user review', userRev);

    const allBusiness = businesArr.find(business => business.id === +businessId)
    console.log('the user business by id params', allBusiness)


    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId))
        dispatch(getBusinessReviewThunk(businessId))
    }, [dispatch]);


    useEffect(() => {
        const errors = [];

        if (!review.length) errors.push("Review text is required")
        if (rating <= 0) errors.push("Stars must be between 1 and 5")

        setValidationErrors(errors)
    }, [review, rating])


    const onSubmit = async (e) => {
        e.preventDefault();

        const reviewInfo = {
            review,
            rating
        }

        let createdReview = await dispatch(addOneReviewThunk(allBusiness.id, reviewInfo))
        dispatch(getBusinessReviewThunk(allBusiness.id))


    }


    return (
       <form>

        <ul>
            {validationErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
        </ul>


        <input
        type="text"
        placeholder="Write your review"
        value={review}
        onChange={updateReviews}
        required
        />

        <input
        type="number"
        placeholder="Rating"
        min="0"
        max="5"
        value={rating}
        onChange={updateStars}
        required
        />

            <button type="submit">Submit Review</button>
         </form>
    )





}


export default ReviewForm;
