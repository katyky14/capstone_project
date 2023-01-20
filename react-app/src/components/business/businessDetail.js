import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllBusinessThunk, getOneBusinessThunk } from '../../store/business'
// import { deleteTheReviewThunk, getBusinessReviewThunk, getUserReviewsThunk } from '../../store/reviews'
import DeleteReviewModal from '../reviews/deleteReviewModal'
import EditReviewFormModal from '../reviews/editReviewFormModal'
import ReviewFormModal from '../reviews/reviewFormModal'


import './businessDetails.css'


function GetBusinessById() {
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const businessObj = useSelector(state => state.businessState)

    const businessArr = Object.values(businessObj)
    const business1 = businessArr.find(buz => buz.id === +businessId)

    // const allReviewsObj = useSelector(state => state.reviewState)

    const user = useSelector(state => state.session.user)

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
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                </span >)
        }
        else if (rating > 4 && rating < 5) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star-half-stroke" />
                </span >)
        }
        else if (rating === 4) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating > 3 && rating < 4) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star-half-stroke" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating === 3) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating > 2 && rating < 3) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star-half-stroke" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating === 2) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating > 1 && rating < 2) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-solid fa-star-half-stroke" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
        else if (rating === 1) {
            return (
                < span className='bz-details-stars'>
                    <i class="fa-solid fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                    <i class="fa-regular fa-star" />
                </span >)
        }
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
                                alt='https://static.vecteezy.com/system/resources/previews/005/276/530/original/set-of-cute-kawaii-breakfast-food-and-beverages-free-vector.jpg'
                                onError={e => { e.currentTarget.src = 'https://static.vecteezy.com/system/resources/previews/005/276/530/original/set-of-cute-kawaii-breakfast-food-and-beverages-free-vector.jpg'; e.currentTarget.className = 'error-img-details' }}
                            />
                        </div>
                        <div className='details-bottom-left'>
                            <div className='details-name-top'>{business.name}</div>
                            <br />
                            <div>{avgRating(business1.reviews)} {business1.reviews.length} reviews </div>
                            <br />
                            <div className='bz-detail-description'>{business.description}</div>
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

                        <div className='overall-rating'> Overall Rating </div>

                        <div>
                            {business1.reviews.length > 0 ? avgRating(business1.reviews) : <span className='bz-details-stars'>
                                <i class="fa-regular fa-star" />
                                <i class="fa-regular fa-star" />
                                <i class="fa-regular fa-star" />
                                <i class="fa-regular fa-star" />
                                <i class="fa-regular fa-star" />
                            </span>}
                            <div className='overall-rating-reviews'>
                                {business1.reviews.length} reviews
                            </div>
                        </div>



                        <br />
                        {/* for users to create a reviews and that are not the owner of the restaurant */}

                        {business1 &&
                            <div className='left-bz-details'>
                                {
                                    business1.reviews.map(rev => (
                                        <div key={rev.id}>

                                            <div>
                                                <div className='bz-left-user'>
                                                    <span className='user-icon-bz-details'>
                                                        {/* <i class="fa-regular fa-circle-user"></i> */}
                                                        <img
                                                            className='icon-user' src={rev.users.iconImg ? rev.users.iconImg : "https://i.pinimg.com/736x/25/77/85/25778577593b1591687a0435eb3542b1.jpg"} alt='https://i.pinimg.com/736x/25/77/85/25778577593b1591687a0435eb3542b1.jpg'
                                                        //    onError={e => { e.currentTarget.src = 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'; e.currentTarget.className ='icon-user' }}
                                                        />
                                                    </span>
                                                    <span className='bz-details-user-firstname'>
                                                        {rev.users.firstName}
                                                    </span>
                                                </div>


                                                <div className='bz-details-rating'>
                                                    {getRating(rev.rating)}
                                        
                                                    {/* <span>10/14/22</span> */}
                                                </div>


                                                <div className='bz-details-review'>
                                                    <div className='bz-inner-review'>
                                                    {rev.review}
                                                    </div>
                                                </div>

                                            </div>


                                            {/* for user who already has a review and want to edit or delete */}

                                            {userReview(rev, user) && !owner &&
                                                <div className='bz-details-users-review-button'>
                                                    <div className='bz-details-users-reviews-inner-div'>
                                                        <div>{<EditReviewFormModal businessId={+businessId} business={business1} />}</div>

                                                        <div className='bz-details-delete-button-reviews'>
                                                            <DeleteReviewModal reviewId={rev.id} businessId={+businessId}/>
                                                        </div>

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
                                <a href={business1.website} target="_blank" style={{ textDecoration: 'none', color: 'blue', fontWeight: '600' }}>Website</a>
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
