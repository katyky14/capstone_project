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

    if (response.ok) {
        const data = await response.json()

        dispatch(getAllBusiness(data.business))
        //console.log('the data thunk in fetch all business', data.business)
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

    const response = await fetch('/api/business', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(businessData)
    });
    //console.log('the response', response)

    if (response.ok) {
        const data = await response.json();
        console.log('the data in bz thunk', data)
        dispatch(addOneBusiness(data))
        return data
    }
}


//edit a bz
export const editBusinessThunk = (businessData, businessId) => async (dispatch) => {

    const response = await fetch(`/api/business/${businessId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(businessData)
    });



    if (response.ok) {
        const data = await response.json();
        dispatch(editBusiness(data));
        return data;
    }
}




// delete a bz

export const deleteBusinessThunk = (businessId) => async (dispatch) => {

    const response = await fetch(`/api/business/${businessId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBusiness(businessId))
    }
}



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
            // console.log('in reducer for bz by id', action.payload)
            newState[action.payload.id] = action.payload
            return newState;
        }

        case ADD_BUSINESS: {
            const newStateBz = { ...state };
            newStateBz[action.payload.id] = action.payload
            return newStateBz
        }

        case EDIT_BUSINESS: {
            const newStateEdit = {...state}
            newStateEdit[action.payload.id] = action.payload
            return newStateEdit
        }

        case DELETE_BUSINESS: {
            const newStateDelete = { ...state }
            delete newStateDelete[action.payload];
            return newStateDelete
        }

        default:
            return state
    }
}

export default businessReducer
