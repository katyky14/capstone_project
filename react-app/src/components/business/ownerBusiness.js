import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteBusinessThunk, getAllBusinessThunk } from "../../store/business";


import { authenticate } from '../../store/session'
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
            <h2>Manage Your Businesses</h2>
            {ownerArr.map(({ id, name, address, city, previewImage }) => (
                <div key={id} className='business-card-container-owner'>
                    <div className="business-card-inner-div-owner">
                        <div className="bz-card-div-left-owner">
                            <img src={previewImage}
                                className='bz-card-pic-owner'
                                alt='image'
                                onError={e => { e.currentTarget.src = 'https://demofree.sirv.com/nope-not-here.jpg' }}
                            />
                        </div>

                        <div className="bz-card-div-right-owner">
                            <div className="bz-card-header-owner">{name} </div>
                            <div className="bz-card-address-owner">{address}, {city} </div>
                            <div>
                                <button onClick={() => history.push(`/business/${id}/edit`)}><EditBusinessForm />Edit Business</button>
                                <button onClick={() => deleteTheBusiness(id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}



        </div>
    )

}


export default OwnerBusiness;
