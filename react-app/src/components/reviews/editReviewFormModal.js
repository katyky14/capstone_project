import { useState } from "react";

import { Modal } from '../../context/Modal'
import EditReviewForm from "./editReviewForm";

function EditReviewFormModal({business}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='bz-details-delete-button-reviews'><i class="fa-solid fa-pen-to-square"></i></button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        < EditReviewForm setShowModal={setShowModal} business={business}/>
                    </Modal>
                )
            }

        </>
    )




}


export default EditReviewFormModal;
