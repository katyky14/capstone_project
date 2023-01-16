// types
const GET_USER_PROFILE = 'userProfile/GET_USER_PROFILE'
const EDIT_USER_PROFILE = 'editProfile/EDIT_USER_PROFILE'

//actions
const getProfile = (profile) => {
    return {
        type: GET_USER_PROFILE,
        profile
    }
}

const editProfile = (profile) => {
    return {
        type: EDIT_USER_PROFILE,
        profile
    }
}

//thunk

export const getProfileThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/profile/${userId}`);

    if (res.ok) {
        const data = await res.json();
        const profile = dispatch(getProfile(data.profile));
        return profile;
    }
}

export const editProfileThunk = (userId, profile) => async (dispatch) => {
    const response = await fetch(`/api/profile/edit/${userId}`, {
        method: "PUT",
        headers:  { "Content-Type": "application/json"},
        body: JSON.stringify(profile)
    });
    // console.log('the response in thunk', response)
    if (response.ok) {
        const data = await response.json();

        dispatch(editProfile(data))
        return data;

    }
}

const userProfileReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_USER_PROFILE: {
            newState = { ...state };
            newState.profile = action.profile;
            return newState
        }

        case EDIT_USER_PROFILE: {
            newState = { ...state };
            newState.profile = action.profile;
            return newState
        }

        default:
            return state;

    }
}

export default userProfileReducer;
