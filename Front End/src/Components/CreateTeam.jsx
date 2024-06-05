import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, getUser } from '../slices/userSlice';
import { createTeam } from '../slices/teamSlice';
import { useNavigate } from 'react-router-dom';
function CreateTeam() {
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const userState = useSelector(state => state.user)
    const [selectedMembers, setSelectedMembers] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const callDispathcers = () => {
        // console.log("calling dispatchers",contentState.changeInProgress);
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
    let availableUsers;

    try{
        availableUsers = userState.users.map(user => { return user._id != userState.loggedInUser._id ? { value: user._id, label: user.name } : { value: "", label: "" } })
    }
    catch(e){
        return <h1>issue</h1>
    }
    availableUsers = availableUsers.filter(user => user.value != "")
    console.log(availableUsers);


    function saveTeam(e) {
        e.preventDefault()
        console.log(selectedMembers);
        // if(name == ""){
        //     setOpen(true)
        // }
        console.log(selectedMembers);
        if( name == "" || selectedMembers.length == 0 || selectedMembers.includes("")){
            setOpen(true)
            return;
        }
        selectedMembers.push(userState.loggedInUser._id)
        dispatch(createTeam({ name, members: selectedMembers }))
        navigate("/teams")
        
    }

    return (
        <div className='uploadContent'>
            <div className='loginHeading'>
                <img src="./src/assets/logo.png" alt="" />
                <h1 className=''>ٹیم بنائیں</h1>

            </div>
            <form onSubmit={saveTeam} action="" className='uploadContent_form' >
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className='uploadContent_title'
                    placeholder='نام'
                    value={name}
                />


                {/* The pop up */}
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        براہ کرم نام اور ممبرز کا فیلڈ بھریں۔
                    </div>
                    <button onClick={closeModal}>OK</button>
                </Popup>
                {/* The pop up */}


                <Select
                    placeholder={"ممبرز چنیں"}
                    // defaultValue={selectedTag}
                    onChange={(e) => {
                        console.log(e.value);
                        setSelectedMembers(prevState => {
                            // console.log(prevState);
                            if (prevState.includes(e.value)) {
                                return prevState;
                            }

                            return [...prevState, e.value]
                        })

                    }}
                    options={availableUsers}
                ></Select>
                <div className="tag_line">
                     {
                        selectedMembers.map((value, index) => {
                            return (
                                <a key={index}>
                                    {`#${userState.users.find(user => user._id == value).name}    `}
                                </a>
                            )
                        })
                    } 
                </div>

                <button onClick={saveTeam} className='uploadContent_button' type="submit"> ٹیم بنائیں </button>
            </form>



        </div>
    )

}

export default CreateTeam