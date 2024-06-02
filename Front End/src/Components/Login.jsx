import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/userSlice';


function Login() {
    const dispatch = useDispatch()
    // const userState = useSelector(state => state.user)
    const User = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [opacityL, setopacityL] = useState(0)
    const navigate = useNavigate()
    const isFirstRender = useRef(true);
    useEffect(() => {
        console.log(isFirstRender);
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Skip the first render
        }
        if (User.loggedInUser) {
            navigate('/homepage')
            // console.log("log")
        }
        else  if(User.status == "failedLogin"){
            setopacityL(1)
        }
    }, [User])
    const a = <FontAwesomeIcon icon={faUser} className='searchIcon' />
    async function formSumbitted(e) {
        e.preventDefault()

        dispatch(loginUser({ email, password }))
        // console.log(User);

        // console.log("herer");
    }
    return (
        <>
            <div className='loginHeading'>
                <img src="./src/assets/logo.png" alt="" />
                <h1 className=''>خوش آمدید</h1>

            </div>
            <div className='loginFormDiv'>
                <form action="" className='loginForm' onSubmit={formSumbitted}>
                    <div className='emailDiv'>
                        <label htmlFor="email">ای میل</label>
                        <div className='inputDiv'>
                            <div className='iconDiv'>
                                <FontAwesomeIcon icon={faUser} className='icon' />
                            </div>

                            <input
                                required
                                type="email"
                                id='email'
                                className='emaliField'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>

                    </div>
                    <div className='passwordDiv'>
                        <label htmlFor="password">پاسورڈ</label>
                        <div className='inputDiv'>
                            <div className='iconDiv'>
                                <FontAwesomeIcon icon={faKey} className='icon' />
                            </div>
                            <input
                                required
                                type="password"
                                className="passwordField"
                                id="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                    </div>
                    <button type="submit" className='loginButton'>لاگ ان</button>
                    <label className='' style={{ opacity: opacityL, color: 'red', margin: 'auto' }} > آپ کا ای میل یا پاسورڈ غلط ہے</label>

                </form>
            </div >
        </>
    )
}

export default Login