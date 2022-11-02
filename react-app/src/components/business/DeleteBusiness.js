import { useDispatch } from "react-redux";
import { deleteBusinessThunk, getAllBusinessThunk } from "../../store/business";
import { authenticate } from "../../store/session";




function DeleteBusiness({ setShowModal, businessId }) {
    const dispatch = useDispatch()

    console.log('businessid', businessId)

    return (
        <div>
            <div>Do you want to delete this business?</div>
            <div>
                <button

                    onClick={async () => {
                        await dispatch(deleteBusinessThunk(businessId))
                        await dispatch(authenticate())
                        await dispatch(getAllBusinessThunk())
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


export default DeleteBusiness
