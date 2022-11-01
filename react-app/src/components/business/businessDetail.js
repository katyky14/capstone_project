import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllBusinessThunk, getOneBusinessThunk } from '../../store/business'
import { deleteTheReviewThunk, getBusinessReviewThunk, getUserReviewsThunk } from '../../store/reviews'
import EditReviewFormModal from '../reviews/editReviewFormModal'
import ReviewFormModal from '../reviews/reviewFormModal'


import './businessDetails.css'


function GetBusinessById() {
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const businessObj = useSelector(state => state.businessState)
    //console.log('in the component', businessObj)
    const businessArr = Object.values(businessObj)
    //console.log('the busines arr', businessArr)
    const business1 = businessArr.find(buz => buz.id === +businessId)
    console.log('the business find', business1)

    const allReviewsObj = useSelector(state => state.reviewState)
    //console.log('the reviews obj', allReviewsObj)
    const user = useSelector(state => state.session.user)
    //console.log('the user', user)

    const owner = business1 && user && business1.ownerId === user.id

    const userReview = (review, user) => user && user.id === review.userId
    const showButton = user && business1 && business1.reviews && business1.reviews.find(rev => rev.userId === user.id)

    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId))
        //dispatch((getAllBusinessThunk()))
    }, [dispatch])


    // rating for stars

    const getRating = (rating) => {
        if (rating === 5) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                </span >)
        }
        else if (rating > 4 && rating < 5) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star-half-stroke" />
                </span >)
        }
        else if (rating === 4) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating > 3 && rating < 4) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star-half-stroke" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating === 3) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating > 2 && rating < 3) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star-half-stroke" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating === 2) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating > 1 && rating < 2) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star-half-stroke" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating === 1) {
            return (
                < span >
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        // else if (rating === 0) {
        //     return (
        //         < span >
        //             <i class="fa-regular fa-star" />
        //             <i class="fa-regular fa-star" />
        //             <i class="fa-regular fa-star" />
        //             <i class="fa-regular fa-star" />
        //             <i class="fa-regular fa-star" />
        //         </span >)

        // }
    }


    //average rating function
    const avgRating = (reviews) => {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            let rating = reviews[i].rating;
            sum += rating;
        }
        const average = sum / reviews.length
        return getRating(average)
    }



    if (!business1) return null


    return !!businessArr.length && (
        <>
            <div className='bz-details-main-container'>
                {/* <h1>Business by ID</h1> */}

                {businessArr.map(business => (
                    <div key={business.id} className='details-bz-div'>
                        <div className='image-container'>
                            <img
                                className='img-details'
                                src={business.previewImage}
                                alt='image'
                                onError={e => { e.currentTarget.src = 'https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg' }}
                            />
                        </div>
                        <div className='details-bottom-left'>
                            <div className='details-name-top'>{business.name}</div>
                            <br />
                            <div>{avgRating(business1.reviews)} {business1.reviews.length} reviews </div>
                            <br />
                            <div>{business.description}</div>
                            <br />
                            <div>Open 9:00AM - 10:00PM </div>
                        </div>
                    </div>
                ))}

                <br />

                <div className='main-div-details-rev'>

                    <br />


                    <div className='left-bz-details'>

                        <div>
                            <div>
                                {user && !showButton && !owner && <ReviewFormModal businessId={+businessId} />}
                            </div>

                        </div>

                        <div>Overall Rating </div>

                        <div>{business1.reviews.length > 0 ? avgRating(business1.reviews) : <span>
                            <i class="fa-regular fa-star" />
                            <i class="fa-regular fa-star" />
                            <i class="fa-regular fa-star" />
                            <i class="fa-regular fa-star" />
                            <i class="fa-regular fa-star" />
                        </span>}
                            {business1.reviews.length} reviews
                        </div>




                        {/* testing to get overall rating chart! */}

                        {/* <div className='rating-reviews'>
                    <div>
                    <div>Overall rating</div>
                    <div>{avgRating(business1.reviews)} {business1.reviews.length} reviews </div>
                    </div>

                    <div>4 stars</div>
                    <div className='rate-bar-container'>
                    <div className='background-rate-color'>
                    {
                        business1.reviews.length > 0 && (
                            <div className='rate-bar' style={{ width: `${getRating()}`}} > </div>
                            )
                        }
                        </div>
                        <div></div>
                        </div>

                    </div> */}

                        {/* end of testing the rating overall chart */}







                        <br />
                        {/* for users to create a reviews and that are not the owner of the restaurant */}

                        {business1 &&
                            <div className='left-bz-details'>
                                {
                                    business1.reviews.map(rev => (
                                        <div key={rev.id}>

                                            <div>
                                                <div><i class="fa-regular fa-circle-user"></i> {rev.users.firstName} </div>


                                                <div>
                                                    {getRating(rev.rating)} <br />
                                                </div>


                                                <div>

                                                    {rev.review}
                                                </div>

                                            </div>


                                            {/* for user who already has a review and want to edit or delete */}

                                            {userReview(rev, user) && !owner &&
                                                <div>
                                                    <div>
                                                        <div>{<EditReviewFormModal businessId={+businessId} business={business1} />}</div>
                                                        <button onClick={async (e) => {
                                                            e.preventDefault()
                                                            await dispatch(deleteTheReviewThunk(rev.id))
                                                            //await dispatch(getBusinessReviewThunk(businessId))
                                                            await dispatch(getOneBusinessThunk(businessId))
                                                        }} > Delete Review </button>

                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    ))}
                            </div>
                        }

                    </div>

                    <br />


                    {/* right side BOX for address */}

                    <div className='bz-detail-right'>
                        <div className='bz-detail-right-div'>

                            <div className='bz-detail-right-website'>
                                <a href={business1.website} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>Website</a>
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </div>



                            <div className='bz-detail-phone'>
                                {business1.phone}
                                <i class="fa-solid fa-phone"></i>
                            </div>

                            <div className='bz-detail-right-div-direction'>
                                <div>
                                    <div className='bz-detail-direction-address'>Address</div>
                                    <div className='bz-detail-direction-two'>{business1.address} {business1.city}, {business1.state}</div>
                                </div>
                                <div className='bz-detail-direction'>
                                    <i class="fa-solid fa-diamond-turn-right"></i>
                                </div>
                            </div>


                        </div>

                    </div>








                </div>
            </div>


        </>
    )
}

export default GetBusinessById;
