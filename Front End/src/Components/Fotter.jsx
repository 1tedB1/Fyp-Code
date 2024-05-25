import React from 'react'
import { NavLink } from 'react-router-dom'

function Fotter() {
    return (
        <>
            <footer className='footer'>
                <div className='firstSection'>
                    <h4 className='footer--item'>
                        <NavLink className={"navlink"} to="/hompepage">پڑھیں</NavLink>
                    </h4>
                    <h4 className='footer--item'>
                        <NavLink className={"navlink"} to="/competition">مقابلہ</NavLink>
                    </h4>
                    <h4 className='footer--item'>
                    {/* <NavLink className={"navlink"} to="/competition">نثر</NavLink>        */}
                    </h4>
                    <h4 className='footer--item'>
                    <NavLink className={"navlink"} to="/hompepage">بلاگ</NavLink>
                    </h4>
                    <h4 className='footer--item'>
                    <NavLink className={"navlink"} to="/aboutus">ہمیں جانیں</NavLink>
                         
                        
                    </h4>
                </div>
                <div className='secondSection'>
                    <img className="footer--logo" src="src\assets\logo.png" alt="" width='10px' />
                    <h4 className='footer--item'>
                        انتظار کس بات کا؟ آئیں ہمیں جوائن کریں
                    </h4>
                    <form action="" className='footer--emailForm emailForm'>
                        <input type="text" placeholder='اپنا ای میل درج کریں۔' className='emailInput' />
                        <button type="submit" className='fotter--emailButton emailButton'>شروع کریں
                        </button>
                    </form>
                </div>


            </footer>
        </>
    )
}

export default Fotter