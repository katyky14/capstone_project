import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";

import './navigation.css'

const StyledNavLinkLogIn = (props) => {
    return <NavLink { ...props } className={`${props.className} login-navlink-style`} />
}

const StyledNavLinkSignUp = (props) => {
    return <NavLink { ...props } className={`${props.className} signup-navlink-style`} />
}



function Navigation({ loaded }) {

    const sessionUser = useSelector(state => state.session.user)


    return (
        <>
            <div className="nav-main-container">

                <div className="nav-logout-div">
                    {/* <div className="home-container"> */}
                        <NavLink to='/' exact={true} activeClassName='active'>
                            Home
                        </NavLink>
                    {/* </div> */}

                    <div className="nav-right-container">
                        {!sessionUser && (
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
                        )}
                    </div>

                </div>

                <div>
                    {sessionUser && (
                        <ProfileButton sessionUser={sessionUser} />
                    )}
                </div>


            </div>
        </>
    )


}

export default Navigation
