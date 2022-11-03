import { useDispatch } from "react-redux";
import { deleteBusinessThunk, getAllBusinessThunk } from "../../store/business";
import { authenticate } from "../../store/session";




function DeleteBusiness({ setShowModal, businessId }) {
    const dispatch = useDispatch()

    //console.log('businessid', businessId)

    return (
        <div className="delete-modal-main-div">
            <div className="delete-title">Do you want to delete this business?</div>
            <div className="delete-button-div">
                <button
                    className="delete-button-modal"
                    onClick={async () => {
                        await dispatch(deleteBusinessThunk(businessId))
                        await dispatch(authenticate())
                        await dispatch(getAllBusinessThunk())
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


export default DeleteBusiness
