import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


import { getAllBusinessThunk } from '../../store/business'

import './allBusiness.css'

function GetAllBusiness() {
    const dispatch = useDispatch()
    const history = useHistory()
    const businessObj = useSelector(state => state.businessState)
    const businessArr = Object.values(businessObj)
    console.log('in the component', businessObj)
    //console.log('component arr', businessArr)

    useEffect(() => {
        dispatch(getAllBusinessThunk())
    }, [dispatch])


    // <img
    // src={original.image}
    // alt="image description for screen readers"
    // onError={e => { e.currentTarget.src = "https://demofree.sirv.com/nope-not-here.jpg"; }}/>

    const averageRate = (reviews) => {
        let total = 0;
        for (let  i = 0; i < reviews.length; i++) {
            total += reviews[i].rating
        }

        return (total/ reviews.length).toFixed(2);
    }


    return !!businessArr.length && (
        <div className='business-card'>
            {businessArr.map(business => (
                <div key={business.id} onClick={() => history.push(`business/${business.id}`)}>
                    {console.log('inside return for all busines', business)}
                    <div className='business-card-container'>
                        <div className='business-card-inner-div'>

                            <div className='bz-card-div-left'>
                                <img src={business.previewImage}
                                    alt='image'
                                    className='bz-card-pic'
                                    onError={e => { e.currentTarget.src = 'https://demofree.sirv.com/nope-not-here.jpg' }}
                                />
                            </div>

                            <div className='bz-card-div-right'>
                                <div className='bz-card-header'>{business.name}</div>
                                <div className='bz-card-rate'> <i className="fa-solid fa-star"></i> {business.reviews.length ? averageRate(business.reviews) : "No Reviews Yet!"} </div>
                                <div className='bz-card-address'>{business.address}, {business.city}</div>
                                <div className='bz-card-review'><i class="fa-regular fa-message"></i> {business.reviews.map(rev => rev.review)} </div>

                            </div>
                        </div>

                    </div>



                </div>
            ))}
        </div>
    )
}


export default GetAllBusiness
