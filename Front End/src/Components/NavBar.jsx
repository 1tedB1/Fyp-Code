import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function NavBar() {
    return (
        <nav className='navBar'>
            <ul className='navBar--list'>
                {/* <section className='navSection1'>
                    <li className='naveBar--item logo'>
                        

                    </li> */}
                {/* </section> */}
                <section className='navSection2'>
                    <NavLink to={"/homepage"}>
                        <img src="src\assets\logo.png" alt="" width='50px' className='logo' />
                    </NavLink>
                    {/* <li className='navBar--item'>
                        شاعری
                    </li> */}
                    <li className='navBar--item'>
                        <NavLink className={"navlink"} to="/"></NavLink>

                    </li>
                    <li className='navBar--item'>
                        <NavLink className={"navlink"} to="/competition">مقابلہ</NavLink>

                    </li>
                    <li className='navBar--item'>
                        <NavLink className={"navlink"} to="/homepage">بلاگ</NavLink>
                    </li>
                    <li className='navBar--item'>
                        <form action="" className='searchForm'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon' />
                            <input type="text" className='searchField' placeholder='تلاش کریں' />
                            {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
                        </form>
                    </li>
                    <li className='navBar--item'>
                        <NavLink className={"navlink"} to="/register">رجسٹر</NavLink>
                    </li>
                    <li className='navBar--item'>
                        <NavLink className={"navlink"} to="/login">داخلہ</NavLink>
                    </li>
                    <li className='navBar--item'>
                        <NavLink className={"navlink"} to="/uploadcontent">اپ لوڈ</NavLink>
                    </li>
                </section>
            </ul>
        </nav>
    )
}

export default NavBar