import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfileThunk, getProfileThunk } from "../../store/profile";

import "./profilePage.css"


function EditProfileForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    let { userId } = useParams();
    userId = Number(userId);
    const profile = useSelector(state => state.profileState.profile);


    const [first_name, setFirst_name] = useState(profile?.firstName || "")
    const [last_name, setLast_name] = useState(profile?.lastName || "")

    const [icon_img, setIcon_img] = useState(profile?.iconImg || "");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const redirectBack = (e) => {
        e.preventDefault();
        history.push(`/profile/${userId}`);
    };

    useEffect(async () => {

        if (userId) {

            const userProfile = await dispatch(getProfileThunk(userId))
            const userProfileData = userProfile.profile;


            setFirst_name(userProfileData.firstName);
            setLast_name(userProfileData.lastName);

            setIcon_img(userProfileData.iconImg);

        }
    }, [dispatch, userId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return alert("Cannot Submit");
        }
        if (!userId) {
            alert("Please log in before see your current profile!")
            history.push("/login")
        }

        let editedData = {
            first_name,
            last_name,
            icon_img,
        };



        const edittedProfile = await dispatch(editProfileThunk(userId, editedData)) // updates state.profile.profile
        // console.log("edittedProfile", edittedProfile)
        history.push(`/profile/${userId}`);
    }


    useEffect(() => {
        let errors = [];

        if (first_name?.length > 25) {
            errors.push("FirstName must be between 1 and 25 characters");
        }

        if (last_name?.length > 25) {
            errors.push("LastName must be between 1 and 25 characters");
        }


        if (
            !icon_img?.includes("jpg") &&
            !icon_img?.includes("jpeg") &&
            !icon_img?.includes("png")
        ) {
            errors.push("Please provide validate url form jpg, jpeg or png");
        }

        setValidationErrors(errors);
    }, [icon_img, first_name, last_name]);


    return (
        <div>
            <form onSubmit={handleSubmit} >

                <ul className="errors_ul">
                    {hasSubmitted && validationErrors.map(error => (
                        <li className='Review_errorsList' key={error}>
                            {error}
                        </li>
                    ))}
                </ul>
                <div className='edit_profile_container'>
                    <div className="profilePreview">
                        <img className="profilePicEdit" src={icon_img} alt="profile image"
                            onError={e => { e.currentTarget.src = "https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg" }}
                        ></img>
                        <div className="profilePreviewName">{first_name}</div>
                        <div className="profilePreviewName">{last_name}</div>

                    </div>
                    <div className='edit_input_container'>
                        <div className='edit_title'>Edit Profile</div>
                        <label>
                            <span className='firstName'>First Name:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => setFirst_name(e.target.value)}
                                required
                                maxlength="25"
                            />
                        </label>

                        <label>
                            <span className='lastName'>Last Name:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => setLast_name(e.target.value)}
                                required
                                maxlength="25"
                            />
                        </label>


                        <label>
                            <span className='edit_Profile_Image'>Profile Image:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="Profile Image URL"
                                value={icon_img}
                                onChange={(e) => setIcon_img(e.target.value)}

                            />
                        </label>

                        <div className="editProfileButton">
                            <button className="backButton" onClick={redirectBack}>
                            <i className="fa-solid fa-power-off"></i>  Cancel
                            </button>
                            <button className="editProfileButton" type="submit">
                            <i className="fa-solid fa-pen-to-square pen"></i> Edit Profile
                            </button>
                        </div>

                    </div>
                </div>
            </form>


        </div>
    )

}

export default EditProfileForm;
