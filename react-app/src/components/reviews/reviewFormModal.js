import { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreateReview from './reviewsForm'

import './reviewFrom.css'


function ReviewFormModal({ businessId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)} className='review-button'>
                <span className='review-icon'><i class="fa-regular fa-star"></i></span> Write a review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <CreateReview setShowModal={setShowModal} businessId={businessId} />

                </Modal>
            )}


        </>
    )




}

export default ReviewFormModal;
