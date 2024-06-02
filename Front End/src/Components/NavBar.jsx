// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { NavLink } from "react-router-dom";
// function NavBar() {
//     return (
//         <nav className='navBar'>
//             <ul className='navBar--list'>
//                 {/* <section className='navSection1'>
//                     <li className='naveBar--item logo'>


//                     </li> */}
//                 {/* </section> */}
//                 <section className='navSection2'>
//                     <NavLink to={"/homepage"}>
//                         <img src="src\assets\logo.png" alt="" width='50px' className='logo' />
//                     </NavLink>
//                     {/* <li className='navBar--item'>
//                         شاعری
//                     </li> */}
//                     <li className='navBar--item'>
//                         <NavLink className={"navlink"} to="/"></NavLink>

//                     </li>
//                     <li className='navBar--item'>
//                         <NavLink className={"navlink"} to="/competition">مقابلہ</NavLink>

//                     </li>
//                     <li className='navBar--item'>
//                         <NavLink className={"navlink"} to="/homepage"></NavLink>
//                     </li>
//                     <li className='navBar--item'>
//                        
//                     </li>
//                     <li className='navBar--item'>
//                         <NavLink className={"navlink"} to="/register">رجسٹر</NavLink>
//                     </li>
//                     <li className='navBar--item'>
//                         <NavLink className={"navlink"} to="/login">داخلہ</NavLink>
//                     </li>
//                     <li className='navBar--item'>
//                         <NavLink className={"navlink"} to="/uploadcontent">اپ لوڈ</NavLink>
//                     </li>
//                 </section>
//             </ul>
//         </nav>
//     )
// }

// export default NavBar


import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { IoMenu } from "@react-icons/all-files/io5/IoMenu"
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../slices/contentSlice";
import { fetchUsers, getUser, logOutUser } from "../slices/userSlice";
// import "./NavbarHook.css";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const callDispathcers = () => {
        // console.log("calling dispatchers",contentState.changeInProgress);
        // dispatch(getAllArticles())
        dispatch(fetchUsers())
        dispatch(getUser())
        // console.log(userState);
    }


    useEffect(() => {
        callDispathcers()
        // dispatch(getAllFeedBack())
        // console.log(state.articles);
    }, [])




    if (userState.status == "loading"
    ) {
        return <h1>Loading...</h1>;
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };
    return (
        <header className="header">
            <nav className="nav container">
                <NavLink to="/" className="nav__logo">
                    <img src="src\assets\logo.png" alt="" width='50px' className='logo' />
                </NavLink>

                <div
                    className={`nav__menu ${showMenu ? "show-menu" : ""}`}
                    id="nav-menu"
                >
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/competition" className="nav__link" onClick={closeMenuOnMobile}>
                                مقابلہ
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                to="/homepage"
                                className="nav__link"
                                onClick={closeMenuOnMobile}
                            >
                                بلاگ
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                to=""
                                className="nav__link"
                                onClick={closeMenuOnMobile}
                            >
                                <form action="" className='searchForm'>
                                    {/* <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon' /> */}
                                    <input type="text" className='searchField' placeholder='تلاش کریں' />
                                    {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
                                </form>
                            </NavLink>
                        </li>
                        {userState.loggedInUser && <><li className="nav__item">
                            <NavLink
                                to="/mainProfile"
                                className="nav__link"
                                onClick={closeMenuOnMobile}
                            >
                                پروفائل
                            </NavLink>
                        </li>
                            <li className="nav__item">
                                <NavLink
                                    to="/messages"
                                    className="nav__link"
                                    onClick={closeMenuOnMobile}
                                >
                                    پیغامات
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink
                                    to="/"
                                    className="nav__link"
                                    onClick={() => {
                                        closeMenuOnMobile()
                                        dispatch(logOutUser())
                                    }}
                                >
                                    لاگ آوٹ
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink
                                    to="/uploadContent"
                                    className="nav__link"
                                    onClick={() => {
                                        closeMenuOnMobile()
                                        // dispatch(logOutUser())
                                    }}
                                >
                                    اپ لوڈ
                                </NavLink>
                            </li>
                        </>
                        }

                        {!userState.loggedInUser && <><li className="nav__item">
                            <NavLink
                                to="/register"
                                className="nav__link"
                                onClick={closeMenuOnMobile}
                            >
                                رجسٹر
                            </NavLink>
                        </li>
                            <li className="nav__item">
                                <NavLink
                                    to="/logIn"
                                    className="nav__link"
                                    onClick={closeMenuOnMobile}
                                >
                                    داخلہ
                                </NavLink>
                            </li>
                        </>
                        }



                    </ul>
                    <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                        <IoClose />
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <IoMenu />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;