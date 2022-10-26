import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import {getAllBusinessThunk, getOneBusinessThunk} from '../../store/business'



function GetBusinessById() {
    const dispatch = useDispatch()
    const {businessId} = useParams()
    const businessObj = useSelector(state => state.businessState)
    //console.log('in the component', businessObj)
    const businessArr = Object.values(businessObj)
    //console.log('the busines arr', businessArr)

    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId))
        // dispatch(getAllBusinessThunk())
    }, [dispatch])

    return !!businessArr.length && (
        <>
            <h1>Business by ID</h1>
            {businessArr.map(business => (
                <div key={business.id}>
                    <div>{business.name}</div>
                    <div>{business.description}</div>
                    <div>{business.address} {business.city}</div>
                    <div>{business.previewImage}</div>
                </div>
            ))}

        </>
    )
}

export default GetBusinessById;
