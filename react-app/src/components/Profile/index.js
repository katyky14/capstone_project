import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileThunk } from "../../store/profile";
import './profilePage.css'

import OwnerBusiness from '../business/ownerBusiness'



const ProfilePage = () => {
    const history = useHistory();
    let { userId } = useParams();
    userId = Number(userId);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    const user = useSelector(state => state.session.user);
    //console.log('the user', user)
    // const businessObj = useSelector(state => state.business);
    // const businessArr = Object.values(businessObj)

    const profile = useSelector(state => state.profileState.profile);
    //console.log('profile', profile)

    const helper = async () => {
        const userProfile = await dispatch(getProfileThunk(userId));

    }


    const GREETING_LIST = [
        "Hello",
        "Hola",
        "Zdravstvuyte",
        "Nǐ hǎo",
        "Olá",
        "Anyoung haseyo",
        "Asalaam alaikum",
        "Namaste",
        "Merhaba",
        "Shalom",
        "Ciao",
        "G'day",
        "Ciao",
        "Hallo",
        "Xin Chào",
    ];

    // const pickRandomGreeting = () => {
    //     return GREETING_LIST[Math.floor(Math.random() * GREETING_LIST.length)];
    // }

    const [greeting, setGreeting] = useState(GREETING_LIST[0]);
    const [second, setSeconds] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setGreeting(GREETING_LIST[second]);
    }, [GREETING_LIST, second]);


    useEffect(() =>  {
        const interval = setInterval(() => {
            setSeconds((seconds) =>
                seconds === GREETING_LIST.length - 1 ? 0 : seconds + 1
            );
        }, 5000);
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const LoadingTimeOut = setTimeout(() => {
            setLoaded(true);
        }, 500);
        return () => clearTimeout(LoadingTimeOut)
    }, []);

    const handleEditProfile = (e, userId) => {
        e.preventDefault();
        history.push(`/profile/edit/${userId}`);
      };


    useEffect(() => {
        helper();
    }, [dispatch, userId]);

    return (
        <div className="Profile_outter_container">
            <div className="Profile_container">
                <div>
                    <div>
                        <img className="profilePage_img" src={profile?.iconImg}
                            onError={e => { e.currentTarget.src = 'https://i.pinimg.com/736x/25/77/85/25778577593b1591687a0435eb3542b1.jpg' }}
                        />
                    </div>
                    <button onClick={(e) => handleEditProfile(e, profile?.id)} className="Edit_profile">
              <i className="fa-solid fa-pen-to-square"></i> Edit profile
            </button>
                </div>
                <div className="second_container">

                    <div className="word-container First">{greeting}, {profile?.firstName} {profile?.lastName}</div>

                    {/* <div className="word_container">

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
                    </div> */}


                </div>

            </div>
            <hr className="line1"></hr>
            <div className="business"><i className="fa-solid fa-utensils" /> My Businesses</div>

            <OwnerBusiness />

            {/* {user.business.length ? <div className="business_img_in_profile_container">
          {user.business.map(business => (

            <div key={business.id}>

              <NavLink to={`/business/${business.id}`}>
                <img className="business_img_in_profile"
                src={business.previewImage}
                onError={e => { e.currentTarget.src = 'https://static.vecteezy.com/system/resources/previews/005/276/530/original/set-of-cute-kawaii-breakfast-food-and-beverages-free-vector.jpg' }}
                />
              </NavLink>
            </div>

          ))}
        </div> : <div className="no_business">You currently have no any business, want to create one ?
          <NavLink to={`/businesses/new`} className="profile_create_business">
            Create Business
          </NavLink>

        </div>} */}


        </div>
    )


}

export default ProfilePage;
