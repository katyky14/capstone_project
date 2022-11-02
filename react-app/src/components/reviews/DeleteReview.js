import { useDispatch } from "react-redux";


import { getOneBusinessThunk } from "../../store/business";
import { deleteTheReviewThunk } from "../../store/reviews";


function DeleteReview({reviewId, setShowModal, businessId}) {

    const dispatch = useDispatch()

    //console.log('the review id', reviewId)

    return (
        <div>
            <div>Do you want to delete this review?</div>
            <div>
                <button

                onClick={ async () => {
                    await dispatch(deleteTheReviewThunk(reviewId))
                    await dispatch(getOneBusinessThunk(businessId))
                    setShowModal(false)
                }}
                >Confirm</button>

                <button
                onClick={() => {
                    setShowModal(false)
                }}
                >Cancel</button>
            </div>

        </div>
    )



}

export default DeleteReview;
