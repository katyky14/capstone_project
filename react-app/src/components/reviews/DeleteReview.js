import { useDispatch } from "react-redux";


import { getOneBusinessThunk } from "../../store/business";
import { deleteTheReviewThunk } from "../../store/reviews";


import './deleteReview.css'

function DeleteReview({reviewId, setShowModal, businessId}) {

    const dispatch = useDispatch()

    //console.log('the review id', reviewId)

    return (
        <div className="delete-modal-main-div">
            <div className="delete-title">Do you want to delete this review?</div>
            <div className="delete-button-div">
                <button
                className="delete-button-modal"
                onClick={ async () => {
                    await dispatch(deleteTheReviewThunk(reviewId))
                    await dispatch(getOneBusinessThunk(businessId))
                    setShowModal(false)
                }}
                >Confirm</button>

                <button
                className="delete-button-modal"
                onClick={() => {
                    setShowModal(false)
                }}
                >Cancel</button>
            </div>

        </div>
    )



}

export default DeleteReview;
