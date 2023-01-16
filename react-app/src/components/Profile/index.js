import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileThunk } from "../../store/profile";
import './profilePage.css'


const ProfilePage = () => {
    const history = useHistory();
    let { userId } = useParams();
    userId = Number(userId);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    const user = useSelector(state => state.session.user);
    console.log('the user', user)
    // const businessObj = useSelector(state => state.business);
    // const businessArr = Object.values(businessObj)

    const profile = useSelector(state => state.profileState.profile);
    //console.log('profile', profile)

    const helper = async () => {
        const userProfile = await dispatch(getProfileThunk(userId));


    }

    // const handleEditProfile = (e, userId) => {
    //     e.preventDefault();
    //     history.push(`/profile/edit/${userId}`);
    //   };


    useEffect(() => {
        helper();
    }, [dispatch, userId]);

    return (
        <div className="Profile_outter_container">
            <div className="Profile_container">
                <div>
                    <div>
                        <img className="profilePage_img" src={profile?.iconImg}
                            onError={e => { e.currentTarget.src = "https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg" }}
                        />
                    </div>
                    {/* <button onClick={(e) => handleEditProfile(e, profile?.id)} className="Edit_profile">
              <i className="fa-solid fa-pen-to-square"></i> Edit profile
            </button> */}
                </div>
                <div className="second_container">

                    {/* <button onClick={(e) => handleEditProfile(e, profile?.id)} className="Edit_profile">
              <i className="fa-solid fa-pen-to-square"></i> Edit profile
            </button> */}

                    <div className="word_container">

                        <div className="First">
                            First Name:
                        </div>
                        <div className="First">
                            {profile?.firstName}
                        </div>
                    </div>

                    <div className="word_container">
                        <div className="Last">
                            Last Name:
                        </div>
                        <div className="Last">
                            {profile?.lastName}
                        </div>
                    </div>

                    {/* <div className="word_container">
              <div className="Gender">
                Gender:
              </div>
              {profile?.gender ?
                <div className="Gender">
                  {profile?.gender}
                </div> : <div>You have no edit your gender yet</div>}
            </div>

            <div className="word_container">
              <div className="Bio">
                Bio:
              </div>
              {profile?.bio ?
                (<div className="Bio1">{profile?.bio}</div>) : (<div>You have not edit your bio yet</div>)}
            </div> */}

                </div>
                {/* <button onClick={(e) => handleEditProfile(e, profile?.id)} className="Edit_profile">
            <i className="fa-solid fa-pen-to-square"></i> Edit profile
          </button> */}

            </div>
            <hr className="line1"></hr>
            <div className="business"><i className="fa-solid fa-utensils" /> My Businesses</div>

            {user.business.length ? <div className="business_img_in_profile_container">
          {user.business.map(business => (

            <div key={business.id}>
                {console.log('the business inside component', business)}
              <NavLink to={`/business/${business.id}`}>
                <img className="business_img_in_profile" src={business.previewImage}></img>
              </NavLink>
            </div>

          ))}
        </div> : <div className="no_business">You currently have no any business, want to create one ?
          <NavLink to={`/businesses/new`} className="profile_create_business">
            Create Business
          </NavLink>

        </div>}


        </div>
    )


}

export default ProfilePage;
