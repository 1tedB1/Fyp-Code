import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { fetchUsers, getUser } from '../slices/userSlice'
import { addReviewToShareWork, fetchPairs, setSelectedPairId, shareWorkInPair } from '../slices/pairSlice'

function Pair_ReviewWork() {
    const { id } = useParams()
    // console.log(pairId);
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)
    const pairRequestState = useSelector((state) => state.pairRequest)
    const pairState = useSelector((state => state.pair))
    // const navigate = useNavigate()
    const callDispatchers = () => {
        try {
            dispatch(fetchUsers())
            dispatch(getUser())
            // dispatch(getPairRequestByUserId())
            dispatch(fetchPairs())
            dispatch(setSelectedPairId(id))
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        callDispatchers()
    }, [])  // useEffect(()=>{
    //     console.log('ran');
    // },[])

    if (pairState.status == "loading" || pairRequestState.status === "loading" || userState.status == "loading") {
        return <h1>Loading...</h1>
    }
    // console.log(pairState);
    // if (pairState.selectedPairId == null) dispatch(setSelectedPairId(id))
    // if (pairState.selectedPairId === null) return <h1>Pair not found</h1>
    // console.log("ar", pairState);

    if (pairState.pairs == []) {
        callDispatchers()
    }

    let selectedPair = pairState.pairs.find((pair) => pair._id === pairState.selectedPairId)

    // console.log(pairState.selectedPairId);
    if(selectedPair == null){
        selectedPair = pairState.pairs.find((pair) => pair._id === pairState.selectedPairId)
    }
    if(selectedPair == null){
        return <h1>pair not found</h1>
    }

    const sharedContent = selectedPair.workShared.map((content, index) => {
        // console.log("content.owner = ", content.owner, 'user = ', userState.loggedInUser._id);
        if (content.owner == userState.loggedInUser._id
            || content.review != ""
        ) return;
        return content
    })
    // console.log("shared ", sharedContent);







    const renderContentAndReview = () => {
        return sharedContent.map((content, index) => {
            if (content == undefined)
                return;
            return <form key={index}
                onSubmit={(e) => {
                    e.preventDefault()
                    // console.log("con", content);
                    console.log("jo", content);
                    dispatch(addReviewToShareWork({ ...content, pairId: id }))
                }}
                className='shared_work_form' >
                {/* {console.log("hihih", sharedContent)} */}
                <div style={{ display: "flex", }}>


                    <textarea
                        contentEditable={false}
                        style={{ width: "100%", height: "100px" }}
                        placeholder=' یہاں لکھیں'
                        className='uploadContent_content'
                        onChange={(e) => {
                            console.log(e.target.value);
                            // setContent(e.target.value)
                        }}
                        value={`مواد: ${content.content}`}
                    >

                    </textarea>
                    {/* <br /> */}
                    <textarea
                        // contentEditable={false}
                        style={{ width: "100%", height: "100px" }}
                        placeholder='ریویو      یہاں لکھیں'
                        className='uploadContent_content'
                        onChange={(e) => {
                            content = { ...content, review: e.target.value }
                            // console.log(e.target.value);
                            // setContent(e.target.value)
                        }}
                    // value={`ریویو: ${content.review}`}
                    >

                    </textarea>
                </div>
                <button>share</button>
            </form>
        })
    }

    return (
        <>

            <div className="view-team-second-div" style={{ display: "flex", flexDirection: "column" }}>
                <h3>پہلے سے شیر شدہ مواد </h3>
                {renderContentAndReview()}
            </div>
        </>
    )
}

export default Pair_ReviewWork