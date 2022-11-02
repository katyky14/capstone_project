import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";

import './navigation.css'
import logo from '../images-all/logo.png'
import logo2 from '../images-all/logo2.png'

const StyledNavLinkLogIn = (props) => {
    return <NavLink {...props} className={`${props.className} login-navlink-style`} />
}

const StyledNavLinkSignUp = (props) => {
    return <NavLink {...props} className={`${props.className} signup-navlink-style`} />
}



function Navigation({ loaded, home }) {

    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    // MENU

    return (

        <div className="nav-main-container">


            {/* <div className={"nav-logout-div"}> */}
                <div className="logo-div" onClick={() => history.push('/')}>

                    {/* <NavLink to='/' exact={true} activeClassName='active'>
                        Home
                    </NavLink> */}
                    <img src={logo2} alt='logo'  className="logo"/>
                </div>


                {!sessionUser && (
                    <div className="nav-right-container">
                        <div className="login-signup-div">
                            <div className="login-div">
                                <StyledNavLinkLogIn to='/login' exact={true} activeClassName='active'>
                                    Login
                                </StyledNavLinkLogIn>
                            </div>
                            <div className="signup-div">
                                <StyledNavLinkSignUp to='/sign-up' exact={true} activeClassName='active'>
                                    Sign Up
                                </StyledNavLinkSignUp>
                            </div>
                        </div>
                    </div>
                )}


                {sessionUser && (
                    <div className="nav-logged-div">
                        <ProfileButton sessionUser={sessionUser} />
                    </div>
                )}
            {/* </div> */}


        </div>

    )


}

export default Navigation
