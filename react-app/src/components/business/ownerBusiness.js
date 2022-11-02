import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteBusinessThunk, getAllBusinessThunk } from "../../store/business";


import { authenticate } from '../../store/session'
import DeleteBusinessModal from "./deleteBusinessModal";
import EditBusinessForm from "./editBusinessForm";

import './ownerBusiness.css'


function OwnerBusiness() {
    const dispatch = useDispatch()
    const history = useHistory();

    const ownerObj = useSelector(state => state.session.user)
    //console.log('the owner obj', ownerObj)

    const ownerArr = useSelector(state => state.session.user?.business)
    //console.log('the owner arr', ownerArr)

    useEffect(() => {
        dispatch(getAllBusinessThunk())
        dispatch(authenticate())
    }, [dispatch])

    const deleteTheBusiness = async (id) => {
        await dispatch(deleteBusinessThunk(id))
        await dispatch(authenticate())
        await dispatch(getAllBusinessThunk())
    }

    return (
        <div className='business-card-owner'>
            <h2 className="h2-owner-div">Manage Your Businesses</h2>
            {ownerArr.map(({ id, name, address, city, previewImage, phone, state }) => (
                <div key={id} className='business-card-container-owner'>
                    <div className="business-card-inner-div-owner">
                        <div className="bz-card-div-left-owner">
                            <img src={previewImage}
                                className='bz-card-pic-owner'
                                alt='https://media1.giphy.com/media/l2Sq2Iw6xwrlzrLs4/giphy.gif?cid=ecf05e47ngdh794pzvn93c9du96d8qhtix3eimwn88q1k6sv&rid=giphy.gif'
                                onError={e => { e.currentTarget.src = 'https://media1.giphy.com/media/l2Sq2Iw6xwrlzrLs4/giphy.gif?cid=ecf05e47ngdh794pzvn93c9du96d8qhtix3eimwn88q1k6sv&rid=giphy.gif'; e.currentTarget.className = 'error-img-owner' }}
                            />
                        </div>

                        <div className="bz-card-div-right-owner">
                            <div className="bz-card-header-owner">{name} </div>
                            <div className="bz-card-phone-owner">Phone Number: {phone}</div>
                            <div className="bz-card-address-owner">{address}, {city}, {state} </div>
                            {/* <div>{state} </div> */}


                            <div className="button-owner-container">
                                {/* <button onClick={() => history.push(`/business/${id}/edit`)} className='button-owner-inner '><EditBusinessForm />Edit Business</button> */}
                                {/* <button onClick={() => deleteTheBusiness(id)} className='button-owner-inner '>Delete</button> */}
                                <button onClick={() => history.push(`/business/${id}/edit`)} className='button-owner-inner '><EditBusinessForm /><i class="fa-solid fa-pen-to-square"></i></button>
                                {/* <button onClick={() => deleteTheBusiness(id)} className='button-owner-inner '><i class="fa-solid fa-trash"></i></button> */}
                                <div className="button-owner-inner">
                                    <DeleteBusinessModal businessId={+id}/>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            ))}



        </div>
    )

}


export default OwnerBusiness;
