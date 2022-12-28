const SEARCH_BUSINESS = 'search/SEARCH_BUSINESS';


const getSearchBz = (payload) => {
    return {
        type: SEARCH_BUSINESS,
        payload
    }
}

export const getSearchBzThunk = (search) => async dispatch => {
    console.log('here in thunk, do you see me?')
    console.log('the search', search)
    const response = await fetch(`/api/search/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search })
    })

    console.log('after response thunk')
    console.log('the response in thunk', response)
    if (response.ok) {
        const data = await response.json();
        console.log('the data in thunk --', data.business) //array
        console.log('the dispatch in thunk', dispatch(getSearchBz(data.business)))
        dispatch(getSearchBz(data.business))
        console.log('the data in thunk without bz', data)
        return data
    }

}


const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_BUSINESS:
            console.log('here in the reducer')
            const searchState = action.payload
            console.log('the action payload', action.payload)
            console.log('in the reducer for state', searchState)
            return searchState
        default:
            return state
    }
}

export default searchReducer
