import { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreateReview from './reviewsForm'




function ReviewFormModal({ businessId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Add Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <CreateReview setShowModal={setShowModal} businessId={businessId} />

                </Modal>
            )}


        </>
    )




}

export default ReviewFormModal;
