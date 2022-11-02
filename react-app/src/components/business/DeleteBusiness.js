import { useDispatch } from "react-redux";
import { deleteBusinessThunk } from "../../store/business";


function DeleteBusiness({setShowModal}) {
    const dispatch = useDispatch()


    return (
        <div>
        <div>Do you want to delete this business?</div>
        <div>
            <button

            onClick={ async () => {
                await dispatch(deleteBusinessThunk(reviewId))
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


export default DeleteBusiness
