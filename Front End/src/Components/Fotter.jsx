import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Fotter() {
    const navigate = useNavigate()
    return (
        <>
            <footer className='footer'>
                <div className='firstSection'>
                    <h4 className='footer--item'>
                        <NavLink className={"navlink"} to="/homepage">پڑھیں</NavLink>
                    </h4>
                    <h4 className='footer--item'>
                        <NavLink className={"navlink"} to="/competition">مقابلہ</NavLink>
                    </h4>
                    <h4 className='footer--item'>
                        {/* <NavLink className={"navlink"} to="/competition">نثر</NavLink>        */}
                    </h4>
                    <h4 className='footer--item'>
                        <NavLink className={"navlink"} to="/homepage">بلاگ</NavLink>
                    </h4>
                    <h4 className='footer--item'>
                        <NavLink className={"navlink"} to="/aboutus">ہمیں جانیں</NavLink>


                    </h4>
                </div>
                <div className='secondSection'>


                    <form action="" className='footer--emailForm emailForm'>
                        <h5 className='footer--item'>
                            انتظار کس بات کا؟ آئیں ہمیں جوائن کریں
                        </h5>
                        {/* <input type="text" placeholder='اپنا ای میل درج کریں۔' className='emailInput' /> */}
                        <button type="submit" onClick={e=>{
                            e.preventDefault()
                            navigate('/register')
                        }} className='fotter--emailButton emailButton'>شامل ہوں
                        </button>
                    </form>
                </div>


            </footer>
        </>
    )
}

export default Fotter