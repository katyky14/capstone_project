import { useState } from "react";

import { Modal } from '../../context/Modal'
import EditReviewForm from "./editReviewForm";

function EditReviewFormModal({business}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Review</button>
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
