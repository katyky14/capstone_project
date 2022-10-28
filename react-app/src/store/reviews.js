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

//reviews for each business

export const getBusinessReviewThunk = (product_id) => async (dispatch) => {
    console.log('the id in thunk', product_id)

    const response = await fetch(`/api/business/$${product_id}/reviews`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getBusinessReview(data.review))

        console.log('the data after dispatch', data)
        // return data;
    }

    return response
}

// user's reviews

export const getUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/current`)

    if (response.ok) {
        const data = await response.json()
        console.log('the data before dispatch', data)
        dispatch(getUserReviews(data.review))
        return { ...data }
    }
}


//add review

export const addOneReviewThunk = (reviewData) => async (dispatch) => {
    const { businessId } = reviewData
    console.log('the id ', businessId)
    const response = await fetch(`/api/business/${businessId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addOneReview(data.review));
        console.log('the data in add review', data)
        return data
    }
}


//edit review

export const editTheReviewThunk = (reviewData) => async (dispatch) => {
    const { reviewId } = reviewData
    console.log('the review id', reviewId)

    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editTheReview(data));
        return data;
    }
}


export const deleteTheReviewThunk = (reviewId) => async(dispatch) => {
    console.log('the review id', reviewId)

    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        const { id } = await response.json();
        dispatch(deleteTheReview(id));
    }
}


//reducer

const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BUSINESS_REVIEWS: {
            const newState = {};
            action.payload.forEach(review => newState[review.id] = review)
            return newState;
        }
        case GET_USER_REVIEWS: {
            const newStateUser = {};
            action.payload.forEach(review => newStateUser[review.id] = review)
            return newStateUser
        }

        case CREATE_REVIEW: {
            if (!state[action.payload.id]) {
                const newStateAdd = {...state, [action.payload.id]: action.payload}
                return newStateAdd;
            }
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    ...action.payload
                }
            };
        }


        case EDIT_REVIEW: {
            if (!state[action.payload.id]) {
                const newStateEdit = { ...state, [action.payload.id]: action.payload };
                return newStateEdit;
            }
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    ...action.payload
                }
            };
        }

        case DELETE_REVIEW: {
            const newStateDelete = { ...state };
            //console.log('in the reducer for review action', action.payload)
            delete newStateDelete[action.payload];
            return newStateDelete;
        }

        default: {
            return state;
        }


    }

}


export default reviewReducer;
