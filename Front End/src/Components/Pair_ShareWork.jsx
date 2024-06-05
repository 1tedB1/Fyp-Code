import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { fetchUsers, getUser } from '../slices/userSlice'
import { fetchPairs, setSelectedPairId, shareWorkInPair } from '../slices/pairSlice'
import Popup from 'reactjs-popup'
function Pair_ShareWork() {

    const { id } = useParams()
    // console.log(pairId);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)
    const pairRequestState = useSelector((state) => state.pairRequest)
    const pairState = useSelector((state => state.pair))
    const [selectedSharedWork, setSelectedSharedWork] = useState({})
    // const navigate = useNavigate()
    const callDispatchers = () => {
        dispatch(fetchUsers())
        dispatch(getUser())
        // dispatch(getPairRequestByUserId())
        dispatch(fetchPairs())
    }
    useEffect(() => {
        callDispatchers()
    }, [])  // useEffect(()=>{
    //     console.log('ran');
    // },[])

    if (pairState.status == "loading" || pairRequestState.status === "loading" || userState.status == "loading") {
        return <h1>Loading...</h1>
    }
    console.log(pairState);
    if (pairState.selectedPairId == null) dispatch(setSelectedPairId(id))
    if (pairState.selectedPairId === null) return <h1>Pair not found</h1>
    console.log("ar", pairState);

    let selectedPair = pairState.pairs.find((pair) => pair._id === pairState.selectedPairId)
    console.log(pairState.selectedPairId);
    if (selectedPair == null) {
        selectedPair = pairState.pairs.find((pair) => pair._id === pairState.selectedPairId)
    }
    if(selectedPair == null){
        return <h1>Pair not found</h1>
    }
    const sharedContent = selectedPair.workShared.map((content, index) => {
        console.log("content.owner = ", content.owner, 'user = ', userState.loggedInUser._id);
        if (content.owner !== userState.loggedInUser._id) return;
        return content
    })
    console.log("shared ", sharedContent);
    // const sharedContent = pairState.pairs.findd


    const EditSharedWork = () => {
        const [content, setContent] = useState(`${selectedSharedWork.content ? selectedSharedWork.content : ""}`)

        useEffect(() => { console.log("he2"); }, [])

        const submitSharedContent = (e) => {
            e.preventDefault()
            if (content === "") {
                setOpen(true)
                return;
            }

            dispatch(shareWorkInPair({ owner: userState.loggedInUser._id, content: content, review: "", pairId: pairState.selectedPairId }))
        }

        // console.log("team", team.sharedWork);
        // console.log("team", team.sharedWork[0]);
        return <div className="view-team-second-div" style={{ flexDirection: "column" }}>
            <h3>نیا مواد شیر کریں</h3>
            <form onSubmit={submitSharedContent} action="" className='shared_work_form' >
                <textarea
                    style={{ width: "100%", height: "200px" }}
                    placeholder=' یہاں لکھیں'
                    className='uploadContent_content'
                    onChange={(e) => {
                        console.log(e.target.value);
                        setContent(e.target.value)
                    }}
                    value={content}
                >
                </textarea>

                {/* The pop up */}
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        براہ کرم عنوان اور مواد کا فیلڈ بھریں۔
                    </div>
                    <button onClick={closeModal}>OK</button>
                </Popup>
                {/* The pop up */}
                <button onClick={submitSharedContent}>شیر</button>
            </form>
        </div>

    }

    // console.log();

    const renderContentAndReview = () => {
        return sharedContent.map((content, index) => {
            return <form key={index} onSubmit={(e) => { e.preventDefault() }} action="" className='shared_work_form' >
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
                        contentEditable={false}
                        style={{ width: "100%", height: "100px" }}
                        placeholder=' یہاں لکھیں'
                        className='uploadContent_content'
                        onChange={(e) => {
                            console.log(e.target.value);
                            // setContent(e.target.value)
                        }}
                        value={`ریویو: ${content.review}`}
                    >

                    </textarea>
                </div>
            </form>
        })
    }

    return (
        <>
            <div>
                <h2 style={{ display: "flex", width: "100%", justifyContent: "center" }} >
                    اپنے قریبی کے ساتھ کام کریں
                </h2>

                <EditSharedWork></EditSharedWork>
            </div>
            <div className="view-team-second-div" style={{ display: "flex", flexDirection: "column" }}>
                <h3>پہلے سے شیر شدہ مواد </h3>
                {renderContentAndReview()}
            </div>
        </>
    )
}

export default Pair_ShareWork