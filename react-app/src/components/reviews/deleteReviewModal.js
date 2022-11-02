
import { useState } from "react";

import { Modal } from "../../context/Modal";
import DeleteReview from "./DeleteReview";



function DeleteReviewModal({reviewId, businessId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
            onClick={() => setShowModal(true)}
            className='bz-details-delete-button-reviews'
            >
                <i class="fa-solid fa-trash"></i>
            </button>

            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteReview setShowModal={setShowModal} reviewId={reviewId} businessId={businessId}/>
                    </Modal>
                )
            }


        </>
    )

}

export default DeleteReviewModal;
