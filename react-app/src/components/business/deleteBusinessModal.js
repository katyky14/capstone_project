import { useState } from "react";

import { Modal } from "../../context/Modal";
import DeleteBusiness from "./DeleteBusiness";


function DeleteBusinessModal({ }) {
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <button
                onClick={() => setShowModal(true)}



            >
                <i class="fa-solid fa-trash"></i>

            </button>

        {
            showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteBusiness setShowModal={setShowModal}/>
                </Modal>
            )
        }

        </>
    )

}

export default DeleteBusinessModal;
