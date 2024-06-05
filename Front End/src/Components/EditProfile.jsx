import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faImage, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, fetchUsers, getUser } from '../slices/userSlice';




function EditProfile() {

    const dispatch = useDispatch()


    // define states for email, password and name


    const userState = useSelector(state => state.user)

    let navigate = useNavigate()

    const callDispatchers = ()=>{
        dispatch(fetchUsers())
        dispatch(getUser())
    }

    useEffect(() => {
        callDispatchers()

    }, [])

    if (userState.status == "loading" || userState.status == "loggedOut"
    ) {
        return;
    }

    const a = <FontAwesomeIcon icon={faUser} className='searchIcon' />;
    

    const EditForm = ({currentUser}) => {
        const [email, setEmail] = useState(currentUser.email)
        const [password, setPassword] = useState(currentUser.password)
        const [name, setName] = useState(currentUser.name)
        const [img, setImg] = useState("")
        const [dob, setDob] = useState(new Date(currentUser.dob))
        // console.log("dob", dob);
        const [opacityL, setopacityL] = useState(0)


        function formSumbitted(e) {
            e.preventDefault()
            dispatch(editProfile({ email, password, name, dob, img }))
            while(userState.status == 'loading'){
                console.log("loading");
            }
            callDispatchers()
        }
    

        return <div className='loginFormDiv'>
            <form action="" className='loginForm' onSubmit={formSumbitted}>
                <div className='emailDiv'>
                    <label htmlFor="email">ای میل</label>
                    <div className='inputDiv'>
                        <div className='iconDiv'>
                            <FontAwesomeIcon icon={faMessage} className='icon' />
                        </div>

                        <input
                            required
                            type="email"
                            id='email'
                            className='emaliField'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}

                        />
                    </div>

                </div>
                <div className='nameDiv'>
                    <label htmlFor="name">نام</label>
                    <div className='inputDiv'>
                        <div className='iconDiv'>
                            <FontAwesomeIcon icon={faUser} className='icon' />
                        </div>
                        <input
                            required
                            type="text"
                            className="passwordField"
                            id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                </div>

                <div className='imgDiv'>
                    <label htmlFor="img">تصویر</label>
                    <div className='inputDiv'>
                        <div className='iconDiv'>
                            <FontAwesomeIcon icon={faImage} className='icon' />
                        </div>
                        <input
                            required
                            type="file"
                            className="imgField"
                            id="img"
                            value={img}
                            width="48" height="48"
                            onChange={(e) => {
                                let filePath = e.target.value
                                const imageFilePattern = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;
                                if (!imageFilePattern.test(filePath)) {
                                    alert('Please select an image file')
                                    e.target.value = ''
                                    return
                                }

                                setImg(e.target.value)
                            }}
                        />
                    </div>
                </div>

                {/* <div className='dobDiv'>
                    <label htmlFor="dob">تاریخ          پیداش</label>
                    <div className='inputDiv'>
                        <div className='iconDiv'>
                            <FontAwesomeIcon icon={faClock} className='icon' />
                        </div>
                        <input
                            required
                            type="date"
                            className="dobField"
                            id="dob"
                            value={dob}
                            onChange={(e) => {
                                console.log(dob); 
                                setDob(e.target.value)
                             }}
                        />
                    </div>
                </div> */}


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



                <button type="submit" className='loginButton'>تبدیل کریں</button>
                <label className='' style={{ opacity: opacityL, color: 'red', margin: 'auto' }} > یہ ای میل پہلے سے استعمال میں ہے</label>

            </form>
        </div>
    }

    return (
        <>
            <div className='loginHeading'>
                <img src="./src/assets/logo.png" alt="" />
                <h1 className=''>واپس خوش آمدید </h1>

            </div>
            <EditForm  currentUser = {userState.loggedInUser}/>
        </>
    )
}

export default EditProfile