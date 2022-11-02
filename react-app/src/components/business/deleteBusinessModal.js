import { useState } from "react";

import { Modal } from "../../context/Modal";
import DeleteBusiness from "./DeleteBusiness";


function DeleteBusinessModal({ businessId}) {
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="button-owner-inner">
                <i class="fa-solid fa-trash"></i>
            </button>

        {
            showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteBusiness setShowModal={setShowModal} businessId={businessId}/>
                </Modal>
            )
        }

        </>
    )

}

export default DeleteBusinessModal;
