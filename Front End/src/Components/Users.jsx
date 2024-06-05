import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, getUser, blockUser, unblockUser } from '../slices/userSlice'
import { createPairRequest, getPairRequestByUserId } from '../slices/pairRequestSlice'
import { NavLink, useNavigate } from 'react-router-dom'
// import { getPairRequestByUserId } from '../../../Back End/controllers/pairRequest.controller'
// import { blockUser } from '../../../Back End/controllers/user.controller'

function Users() {

    const userState = useSelector(state => state.user)
    const pairRequestState = useSelector(state => state.pairRequest)
    const dispatch = useDispatch()
    const [testState, setTestState] = useState(false)
    const first = useRef(true)
    const navigate = useNavigate()

    function callDispatchers() {
        dispatch(fetchUsers())
        dispatch(getUser())
    }
    useEffect(() => {

        callDispatchers()
    }, [testState, useState.blocking])

    if (userState.status === "loading" || userState.loggedInUser == null) return <h1>Loading...</h1>

    if (first.current) {
        dispatch(getPairRequestByUserId({ userId: userState.loggedInUser._id }))
        first.current = false
    }

    const RenderUsers = () => {
        // useEffect(()=>{
        //     dispatch(getPairRequestByUserId({ userId: userState.loggedInUser._id }))
        // },[])
        // if(pairRequestState.status === "loading") return <h1>Loading...</h1>
        return userState.users.map((user) => {
            // console.log("d");
            if (user._id == userState.loggedInUser._id) return;
            const [isBlocked, setBlocked] = useState(userState.loggedInUser.blockedUsers.find(obj => obj._id == user._id) ? true : false);
            // if(isBlocked) return;
            return (
                <div key={user._id} className='buddies-recievedRequests-card user_page_first_div'>
                    <NavLink to={`/viewProfile/${user._id}`}>
                        <h5>{
                            user.name
                        }</h5>
                    </NavLink>
                    <div className='buddies-recievedRequests-card-buttons user_page_fd_buttonD'>
                        <button onClick={(e) => {
                            if (!isBlocked) {
                                setBlocked(true)
                                dispatch(blockUser({ userId: userState.loggedInUser._id, blockedUserId: user._id }))



                                // while(userState.blocking){
                                //     console.log("hi");
                                // }
                                // console.log("hi",userState.status);
                                setTestState(!testState)
                            }
                            else {
                                setBlocked(false)
                                console.log("herer");
                                console.log(user._id);
                                dispatch(unblockUser({ userId: userState.loggedInUser._id, blockedUserId: user._id }))
                            }

                        }
                        } >{`${isBlocked ? "Unblock" : "Block"}`}</button>

                        <button onClick={e => {
                            navigate(`/messages/${user._id}`)
                        }}>
                            Message
                        </button>
                        {pairRequestState.pairRequest.find(obj => obj.sender == userState.loggedInUser._id && obj.receiver == user._id) || pairRequestState.pairRequest.find(obj => obj.sender == user._id && obj.receiver == userState.loggedInUser._id) ? <button disabled>Pair Request Sent</button> :
                            <button onClick={(e) => {
                                // e.target.style.opacity = "0"
                                // console.log("e",e.target.style.opacity);
                                dispatch(createPairRequest({ sender: userState.loggedInUser._id, receiver: user._id }))
                                alert("Pair request sent")
                                setTestState(!testState)
                                // this.forceUpdate()
                                // e.target.style.opacity = "0"
                                callDispatchers()
                                // Window.location.reload()
                            }}>
                                Send Pair Request
                            </button>
                        }
                    </div>

                </div>
            )
        }
        )
    }




    return (<>
        <div className='loginHeading' style={{ margin: "0" }}>
            <img src="./src/assets/logo.png" alt="" />
        </div>
        <div className='users_page' style={{ marginTop: "0" }}>
            <h2 style={{ marginBottom: "2%" }}>
                ہمارے صارفین
            </h2>
            {<RenderUsers />}
        </div>
    </>
    )
}

export default Users