const SEARCH_ALL_BUSINESS = 'search/SEARCH_ALL_BUSINESS'

const getSearchAllBusiness = (payload) => {
    return {
        type: SEARCH_ALL_BUSINESS,
        payload
    }
}

export const getSearchAllBusinessThunk = (searchData) => async (dispatch) => {
    console.log('search data in thunk', searchData)
    const response = await fetch('/api/search/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({searchData})
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getSearchAllBusiness(data.business))
        return data
    }
}



const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_ALL_BUSINESS:
            let searchedBz = action.payload
            return searchedBz;

        default:
            return state
    }
}


export default searchReducer;
