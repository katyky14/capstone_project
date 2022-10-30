import { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreateReview from './reviewsForm'




function ReviewFormModal({ businessId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}><i class="fa-regular fa-star"></i> Write a review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <CreateReview setShowModal={setShowModal} businessId={businessId} />

                </Modal>
            )}


        </>
    )




}

export default ReviewFormModal;
