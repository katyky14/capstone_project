//types
const GET_BUSINESSES = 'business/GET_BUSINESSES'
const GET_BUSINESS_BY_ID = 'business/GET_BUSINESS_BY_ID'
const EDIT_BUSINESS = 'business/EDIT_BUSINESS'
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

const editBusiness = payload => {
    return {
        type: EDIT_BUSINESS,
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

    //console.log('the response in all thunk', response)
    if (response.ok) {
        const data = await response.json()
        //console.log('the data thunk in fetch all business', data)
        dispatch(getAllBusiness(data.business))
    }
}

// get bz by id

export const getOneBusinessThunk = (id) => async dispatch => {
    const response = await fetch(`/api/business/${id}`);
    //console.log('the in in thunk for details', id)
    if (response.ok) {
        const data = await response.json();
        //console.log('the data thunk  fetch bz ID', data)
        dispatch(getOneBusiness(data.oneBusiness))
        return { ...data }
    }
}

// add bz thunk
// export const addOneBusinessThunk = (businessData) => async (dispatch) => {
//     const response = await fetch('/api/business', {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(businessData)
//     })

//     if (response.ok) {
//         const data = await response.json()
//         console.log('the data in thunk for create', data)
//         console.log('the business data in thunk for create', businessData)
//         // to add image to the image table
//         const imageResponse = await fetch(`/api/business/${data.business.id}/images`, {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 "image_url": businessData.image_url
//             })
//         })
//         const imageData = await imageResponse.json()
//         dispatch(addOneBusiness(data));
//         return data;
//     }
// }

//add business
export const addOneBusinessThunk = (businessData) => async (dispatch) => {
    //console.log('the business data', businessData)
    const response = await fetch('/api/business', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(businessData)
    });

    //console.log('after post', businessData)
    //console.log('after post in thunk response ', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(addOneBusiness(data))
        //console.log('the data if response is ok', data)
        return data
    }
}


//edit a bz
export const editBusinessThunk = (businessData) => async (dispatch) => {
    //console.log('before everything', businessData)

    const response = await fetch(`/api/business/${businessData.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(businessData),
    });

    //console.log('after response', response)
    //console.log('after response the business data', businessData)

    if (response.ok) {
        const data = await response.json();
        //console.log('inside the response the data is', data)
        dispatch(editBusiness(data))
        //console.log('after dispatch data is', data)
        return data;
    }
}




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

        case ADD_BUSINESS: {
            const newStateBz = { ...state };
            //console.log('in reducer', action)
            //console.log('in the reducer the action.payload', action.payload)
            newStateBz[action.payload.business.id] = action.payload;
            //console.log('in the reducer the state after normalization', newStateBz)
            return newStateBz
        }

        case EDIT_BUSINESS: {
            const newStateEdit = {...state}
            console.log('in reducer ----', action.payload)
            newStateEdit[action.payload.editedBusiness.id] = action.payload
            console.log('in reducer after normalized', newStateEdit)
            return newStateEdit
        }

        default:
            return state
    }
}

export default businessReducer
