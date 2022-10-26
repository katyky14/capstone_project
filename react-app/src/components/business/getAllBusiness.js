import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'


import { getAllBusinessThunk} from '../../store/business'

function GetAllBusiness() {
    const dispatch = useDispatch()
    const history = useHistory()
    const businessObj = useSelector(state => state.businessState)
    const businessArr = Object.values(businessObj)
    // console.log('in the component', businessObj)
    //console.log('component arr', businessArr)

    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])



    return !!businessArr.length && (
        <div>
            <h2>GET ALL BUSINESS COMPONENT</h2>
            {businessArr.map(business => (
                <div key={business.id} onClick={() => history.push(`business/${business.id}`)}>
                    <div>{business.name}</div>
                    <div>{business.address} </div>
                    <div>{business.city} </div>
                    <div>{business.previewImage}</div>
                    <hr></hr>


                </div>
            ))}
        </div>
    )
}


export default GetAllBusiness
