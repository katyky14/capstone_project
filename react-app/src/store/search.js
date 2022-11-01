const SEARCH_ALL_BUSINESS = 'search/SEARCH_ALL_BUSINESS'

const getSearchAllBusiness = (payload) => {
    return {
        type: SEARCH_ALL_BUSINESS,
        payload
    }
}

export const getSearchAllBusinessThunk = (search) => async (dispatch) => {
    const response = await fetch('/api')
}
