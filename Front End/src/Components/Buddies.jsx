import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchUsers, getUser } from '../slices/userSlice'
import { deletePairRequest, getPairRequestByUserId } from '../slices/pairRequestSlice'
import { createPair, deletePair, fetchPairs, setSelectedPairId } from '../slices/pairSlice'


function Buddies() {


    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)
    const pairRequestState = useSelector((state) => state.pairRequest)
    const pairState = useSelector((state => state.pair))
    const navigate = useNavigate()
    const callDispatchers = () => {
        dispatch(fetchUsers())
        dispatch(getUser())
        dispatch(getPairRequestByUserId())
        dispatch(fetchPairs())
    }
    useEffect(() => {
        callDispatchers()
    }, [])

    if (pairState.status == "loading" || pairRequestState.status === "loading" || userState.status == "loading") {
        return <h1>Loading...</h1>
    }


    const RecievedRequests = () => {
        console.log(pairRequestState.pairRequest);
        const recievedRequests = pairRequestState.pairRequest.map((pairRequest) => {
            // console.log("p", pairRequest.receiver);
            // console.log("u", userState.loggedInUser._id);
            // console.log(userState.loggedInUser._id === pairRequest.receiver);
            if (userState.loggedInUser._id == pairRequest.receiver) {
                return (
                    <div className='buddies-recievedRequests-card'>
                        <h4>{
                            userState.users.find((user) => user._id === pairRequest.sender).name
                        }</h4>
                        <div className='buddies-recievedRequests-card-buttons'>
                            <button
                                onClick={(e) => {
                                    dispatch(createPair({ writer1: pairRequest.receiver, writer2: pairRequest.sender }))
                                    // dispatch()
                                    dispatch(deletePairRequest(pairRequest._id))
                                    callDispatchers()
                                }}
                            >Accept</button>
                            <button
                                onClick={(e) => {
                                    dispatch(deletePairRequest(pairRequest._id))
                                    callDispatchers()
                                }}
                            >Reject</button>
                        </div>

                    </div>
                )
            }
        })
        return (
            <div className='buddies-recievedRequests' style={{ marginTop: "0" }}>
                <h2>
                    موصول درخواستیں
                </h2>
                <br />
                {console.log("h", recievedRequests.includes(undefined))}

                {(recievedRequests.includes(undefined) || recievedRequests.length == 0) ? <h5 >("کوی درخواستیں نہیں")</h5> : recievedRequests}


            </div>
        )
    }

    const SentRequests = () => {

        const sentRequests = pairRequestState.pairRequest.map((pairRequest) => {
            if (userState.loggedInUser._id == pairRequest.sender) {
                return (
                    <div className='buddies-recievedRequests-card'>
                        <h4>{
                            userState.users.find((user) => user._id === pairRequest.receiver).name
                        }</h4>
                        <div className='buddies-recievedRequests-card-buttons'>
                            <button onClick={(e) => {
                                dispatch(deletePairRequest(pairRequest._id))
                                callDispatchers()
                            }
                            } >cancel</button>

                        </div>

                    </div>
                )
            }
        })
        return (
            <div className='buddies-sentRequests' style={{ marginTop: "0" }}>
                <h2>
                    بھیجی درخواستیں
                </h2>
                <br />
                {console.log("j", sentRequests.includes(undefined))}
                {sentRequests.includes(undefined) || sentRequests.length == 0 ? <h5>("کوی درخواستیں نہیں")</h5> : sentRequests}
            </div>
        )
    }

    const PairsFormed = () => {
        let pairsOfCurrentUser = pairState.pairs.map(pair => {
            if (pair.writer1 === userState.loggedInUser._id || pair.writer2 === userState.loggedInUser._id) {
                return pair
            }
        })
        // console.log("h", pairState.pairs)
        // console.log(pairsOfCurrentUser);
        pairsOfCurrentUser = pairsOfCurrentUser.filter(pair => pair !== undefined)
        console.log(pairsOfCurrentUser);
        const pairsUI = pairsOfCurrentUser.map(pair => {
            return (
                <div className='buddies-pairsFormed-card buddies-recievedRequests-card' >
                    <h4>{
                        userState.users.find((user) => user._id === pair.writer1).name
                    } ،{
                            userState.users.find((user) => user._id === pair.writer2).name
                        }
                    </h4>
                    <div className='buddies-recievedRequests-card-buttons buddies-pairsFormed-card-buttons'>
                        <button onClick={(e) => {
                            dispatch(setSelectedPairId(pair._id))
                            navigate(`/pair/shareWork/${pair._id}`)
                        }} >
                            Shared Work</button>

                        <button onClick={(e) => {
                            dispatch(setSelectedPairId(pair._id))
                            navigate(`/pair/reviewWork/${pair._id}`)
                        }} >
                            review Work</button>
                        <button onClick={(e) => {
                            dispatch(deletePair(pair._id))
                            callDispatchers()

                        }} >
                            remove</button>

                    </div>

                </div>
            )
        })
        return (
            <div className='buddies-pairsFormed' style={{ marginTop: "0" }}>
                {/* <div className='buddies-recievedRequests-card'>
                    <h4>{
                        
                    }</h4>
                    <div className='buddies-recievedRequests-card-buttons'>
                        <button onClick={(e) => {

                        }
                        } >cancel</button>

                    </div>

                </div> */}
                <h2>
                    آپ کے جوڑے
                </h2>
                {pairsUI.length == 0 ? <h5>("کوی جوڑ نہیں")</h5> : pairsUI}
            </div>
        )
    }


    return (
        <>

            <div className='loginHeading' style={{ margin: "0" }} >
                <h3 className=''>قریبی دوست</h3>

            </div>
            <div className='buddies'>

                <RecievedRequests ></RecievedRequests>
                {/* <hr /> */}
                <SentRequests></SentRequests>
                {/* <hr /> */}
                <PairsFormed></PairsFormed>
            </div>
        </>
    )

}

export default Buddies