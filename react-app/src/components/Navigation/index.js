import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";




function Navigation({ loaded }) {

    const sessionUser = useSelector(state => state.session.user)


    return (
        <>
            <div>
                <div>
                    <NavLink to='/' exact={true} activeClassName='active'>
                        Home
                    </NavLink>
                </div>

                {!sessionUser && (
                    <div>
                        <div>
                            <NavLink to='/login' exact={true} activeClassName='active'>
                                Login
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to='/sign-up' exact={true} activeClassName='active'>
                                Sign Up
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>

            <div>
                {sessionUser && (
                    <ProfileButton sessionUser={sessionUser} />
                )}
            </div>
        </>
    )


}

export default Navigation
