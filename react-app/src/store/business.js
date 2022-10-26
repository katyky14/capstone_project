//types
const GET_BUSINESSES = 'business/GET_BUSINESSES'
const GET_BUSINESS_BY_ID = 'business/GET_BUSINESS_BY_ID'
const ADD_BUSINESS = 'business/ADD_BUSINESS'
const DELETE_BUSINESS = 'business/DELETE_BUSINESS'


// actions

const getAllBusiness = payload => {
    return {
        type: GET_BUSINESSES,
        payload
    }
}

const getOneBusiness = payload => {
    return {
        type: GET_BUSINESS_BY_ID,
        payload
    }
}

const addOneBusiness = payload => {
    return {
        type: ADD_BUSINESS,
        payload
    }
}

const deleteBusiness = payload => {
    return {
        type: DELETE_BUSINESS,
        payload
    }
}


// THUNK action creator

// get all businesses
export const getAllBusinessThunk = () => async dispatch => {
    const response = await fetch('/api/business/')

    if (response.ok) {
        const data = await response.json()
        console.log('the data thunk in fetch all business', data)
        dispatch(getAllBusiness(data.business))
    }
}

// get bz by id

export const getOneBusinessThunk = (id) => async dispatch => {
    const response = await fetch(`/api/business/${id}`);

    if (response.ok) {
        const data = await response.json();
        console.log('the data thunk  fetch bz ID', data)
        dispatch(getOneBusiness(data.oneBusiness))
        return { ...data }
    }
}

// add bz thunk
export const addOneBusinessThunk = (businessData) => async (dispatch) => {
    const response = await fetch('/api/business', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessData)
    })

    if (response.ok) {
        const data = await response.json()
        console.log('the data in thunk for create', data)
        console.log('the business data in thunk for create', businessData)
        // to add image to the image table
        const imageResponse = await fetch(`/api/business/${data.business.id}/images`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "image_url": businessData.image_url
            })
        })
        const imageData = await imageResponse.json()
        dispatch(addOneBusiness(data));
        return data;
    }
}


//edit a bz





// delete a bz




//reducer

const businessReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BUSINESSES: {
            const allBusiness = {}
            action.payload.forEach(business => {
                allBusiness[business.id] = business
            })
            return allBusiness
        }

        case GET_BUSINESS_BY_ID: {
            const newState = {};
            newState[action.payload.id] = action.payload
            return newState;
        }

        default:
            return state
    }
}
