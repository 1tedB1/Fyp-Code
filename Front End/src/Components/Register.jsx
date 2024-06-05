import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faImage, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';




function Register() {

    const dispatch = useDispatch()


    // define states for email, password and name
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [dob, setDob] = useState(Date.now())
    const [opacityL, setopacityL] = useState(0)


    const a = <FontAwesomeIcon icon={faUser} className='searchIcon' />;
    let navigate = useNavigate()
    async function formSumbitted(e) {
        e.preventDefault()
        // let formData = new FormData()
        // formData.append('file',img)
        // console.log('file',formData); 
        // console.log(img);
        const reader = new FileReader();
        reader.readAsDataURL(img);
        let bs64 = "ب";
        reader.onloadend = async () => {
            const base64String = reader.result.replace(/^data:(.*,)?/, '');
            bs64 = {
                name: img.name,
                type: img.type,
                data: base64String,
            };
            let avatar = bs64;
            console.log("avava", avatar);
            // const res = await axios.post('http://localhost:4000/api/v1/register',{name,email,password,avatar,dob})
            const res = await fetch('http://localhost:4000/api/v1/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    avatar,
                    dob
                }),
                // avatar:img

            })
            const data = await res.json()
            if (data.success === true) {
                navigate('/login')

            }
            else {
                setopacityL(1)
            }
        }

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
                                // value={img}
                                width="48" height="48"
                                onChange={(e) => {
                                    let filePath = e.target.value
                                    const imageFilePattern = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;
                                    if (!imageFilePattern.test(filePath)) {
                                        alert('Please select an image file')
                                        e.target.value = ''
                                        return
                                    }
                                    console.log("img", e.target.files[0]);
                                    setImg(e.target.files[0])
                                }}
                            />
                        </div>
                    </div>

                    <div className='dobDiv'>
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
                                onChange={(e) => { setDob(e.target.value) }}
                            />
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



                    <button type="submit" className='loginButton'>رجسٹر</button>
                    <label className='' style={{ opacity: opacityL, color: 'red', margin: 'auto' }} > یہ ای میل پہلے سے استعمال میں ہے</label>

                </form>
            </div>
        </>
    )
}

export default Register