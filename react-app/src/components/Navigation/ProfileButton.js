import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../store/session";


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
            <div>
                <button onClick={openMenu} >
                    <div>
                    <i className="fas fa-user-circle fa-2x" />
                    <i className="fas fa-angle-down fa-2x" />
                    </div>
                </button>
            </div>
            {showMenu && sessionUser && (
                <ul>
                    <li>
                        <NavLink to='/business/new' exact={true}>Create a Business</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='/' exact={true}>My reviews</NavLink>
                    </li>
                    <li>
                        <NavLink>My Business</NavLink>
                    </li> */}
                    <li>
                        <div onClick={loggingOut}>Log out</div>
                    </li>


                </ul>
            )}




        </div>
    )

}


export default ProfileButton
