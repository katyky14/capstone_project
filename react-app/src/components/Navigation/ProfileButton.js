import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../store/session";


import './profileButton.css'

const StyledNavBusinessForm = (props) => {
    return <NavLink {...props} className={`${props.className} navlink-business-form`} />
}

const StyledNavMyBusiness = (props) => {
    return <NavLink {...props} className={`${props.className} navlink-business-user`} />
}

const StyledNavAllBusiness = (props) => {
    return <NavLink {...props} className={`${props.className} navlink-business-all`} />
}

function ProfileButton({ sessionUser }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])



    const loggingOut = async (e) => {
        e.preventDefault();
        await dispatch(logout());

        return history.push('/')
    }

    return (
        <div>

        {/* <div className="profile-container"> */}
        <ul className="profile-container">

            <li className="li-owner">
                <StyledNavBusinessForm to='/business/new' exact={true}> Create Business </StyledNavBusinessForm>
            </li>
            <li className="li-owner">
                <StyledNavAllBusiness to='/business' exact={true}>All Restaurants</StyledNavAllBusiness>
            </li>


            <li>
                <button onClick={openMenu} className="button-user">
                    <div>
                        {/* <i className="fas fa-user-circle fa-2x" /> */}
                        {/* <i className="fas fa-angle-down fa-2x" /> */}
                        <img
                        className="profile-icon" src={sessionUser.iconImg ? sessionUser.iconImg : 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'}
                        onError={e => { e.currentTarget.src = 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'; e.currentTarget.className ='icon-user' }}

                        ></img>

                    </div>
                </button>
            </li>

        </ul>
        {/* </div> */}


            {showMenu && (
                <ul className="profile-dropdown">
                    <li className="profile-content">
                    <i class="fa-regular fa-circle-user"></i> {sessionUser.username}</li>
                    {/* <li>
                        <NavLink to='/' exact={true}>My reviews</NavLink>
                    </li> */}
                    <li className="profile-content button-style-profile">
                        <StyledNavMyBusiness to='/business/owner' exact={true}> <i class="fa-solid fa-business-time"></i> My Businesses </StyledNavMyBusiness>
                    </li>
                    <li className="profile-content button-style-profile">
                        <div onClick={loggingOut} className='button-style-profile'> <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                    </li>

                </ul>
            )}




        </div>
    )

}


export default ProfileButton
