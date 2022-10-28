import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteBusinessThunk, getAllBusinessThunk } from "../../store/business";


import { authenticate } from '../../store/session'
import EditBusinessForm from "./editBusinessForm";




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
        <div>
            <h2>Business Owner Page</h2>
            {ownerArr.map(({ id, name, address, city, previewImage }) => (
                <div key={id}>
                    <div>{name} </div>
                    <div>{address} </div>
                    <div>{city} </div>
                    <img src={previewImage}
                        alt='image'
                        onError={e => { e.currentTarget.src = 'https://demofree.sirv.com/nope-not-here.jpg' }}
                    />
                    <button onClick={() => history.push(`/business/${id}/edit`)}><EditBusinessForm />Edit Business</button>
                    <button onClick={() => deleteTheBusiness(id)}>Delete</button>
                </div>
            ))}



        </div>
    )

}


export default OwnerBusiness;
