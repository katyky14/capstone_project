const SEARCH_BUSINESS = 'search/SEARCH_BUSINESS';


const getSearchBz = (payload) => {
    return {
        type: SEARCH_BUSINESS,
        payload
    }
}

export const getSearchBzThunk = (search) => async dispatch => {

    const response = await fetch(`/api/search/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search })
    })


    if (response.ok) {
        const data = await response.json();

        dispatch(getSearchBz(data.business))

        return data
    }

}


const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_BUSINESS:
            const searchState = action.payload
            return searchState

        default:
            return state
    }
}

export default searchReducer
