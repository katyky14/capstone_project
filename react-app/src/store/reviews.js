//type
const GET_BUSINESS_REVIEWS = 'reviews/GET_REVIEWS_BUSINESS'
const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


// action

const getBusinessReview = payload => {
    return {
        type: GET_BUSINESS_REVIEWS,
        payload
    }
}

const getUserReviews = payload => {
    return {
        type: GET_USER_REVIEWS,
        payload
    }
}

const addOneReview = payload => {
    return {
        type: CREATE_REVIEW,
        payload
    }
}

const editTheReview = payload => {
    return {
        type: EDIT_REVIEW,
        payload
    }
}

const deleteTheReview = payload => {
    return {
        type: DELETE_REVIEW,
        payload
    }
}


// thunk action creator

export const getBusinessReviewThunk = (product_id) => async (dispatch) => {
    console.log('the id in thunk', product_id)

    const response = await fetch(`/api/business/$${product_id}/reviews`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getBusinessReview(data.reviews))
    }
}
