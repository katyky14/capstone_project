import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllBusinessThunk, getOneBusinessThunk } from '../../store/business'
import { deleteTheReviewThunk, getBusinessReviewThunk, getUserReviewsThunk } from '../../store/reviews'
import EditReviewFormModal from '../reviews/editReviewFormModal'
import ReviewFormModal from '../reviews/reviewFormModal'



function GetBusinessById() {
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const businessObj = useSelector(state => state.businessState)
    //console.log('in the component', businessObj)
    const businessArr = Object.values(businessObj)
    //console.log('the busines arr', businessArr)
    const business1 = businessArr.find(buz => buz.id === +businessId)
    //console.log('the business find', business1)

    const allReviewsObj = useSelector(state => state.reviewState)
    //console.log('the reviews obj', allReviewsObj)
    const user = useSelector(state => state.session.user)
    // console.log('the user', user)

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
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /></span >)
        }
        else if (rating > 4 && rating < 5) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star-half-stroke" /></span >)
        }
        else if (rating === 4) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating > 3 && rating < 4) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star-half-stroke" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating === 3) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating > 2 && rating < 3) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star-half-stroke" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating === 2) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating > 1 && rating < 2) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star-half-stroke" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating === 1) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
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
            <h1>Business by ID</h1>
            {businessArr.map(business => (
                <div key={business.id}>
                    <div>{business.name}</div>
                    <div>{business.description}</div>
                    <div>{business.address} {business.city}</div>
                    <div>{business.phone}</div>
                    <img src={business.previewImage}
                        alt='image'
                        onError={e => { e.currentTarget.src = 'https://demofree.sirv.com/nope-not-here.jpg' }}
                    />

                </div>
            ))}

            <div>
                <div>{business1.reviews.length} reviews {avgRating(business1.reviews)}</div>
                <div>
                    Review for this Business
                    {user && !showButton && !owner && <ReviewFormModal businessId={+businessId} />}
                </div>

            </div>

            {/* for users to create a reviews and that are not the owner of the restaurant */}

            {
                business1 &&
                <div>
                    {
                        business1.reviews.map(rev => (
                            <div key={rev.id}>

                                <div>
                                    {getRating(rev.rating)} <br /> <br />
                                    {rev.review}
                                </div>



                                {/* for user who already has a review and want to edit or delete */}

                                {
                                userReview(rev, user) && !owner &&

                                    <div>

                                        <div>
                                        <button onClick={async (e) => {
                                            e.preventDefault()
                                            await dispatch(deleteTheReviewThunk(rev.id))
                                            //await dispatch(getBusinessReviewThunk(businessId))
                                            await dispatch(getOneBusinessThunk(businessId))
                                        }} > Delete Review </button>

                                         </div>


                                         <div>
                                            {
                                                <EditReviewFormModal businessId={+businessId} business={business1}/>
                                            }
                                        </div>

                                        </div>



                                }





                            </div>
                        ))
                    }
                </div>
            }


        </>
    )
}

export default GetBusinessById;
