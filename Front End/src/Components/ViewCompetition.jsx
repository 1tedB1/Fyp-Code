import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEntry, getAllCompetitions } from '../slices/competitionSlice'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchUsers, getUser } from '../slices/userSlice';
import Select from "react-select";
import Popup from 'reactjs-popup';


function ViewCompetition() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const competitionState = useSelector(state => state.competition)
    const [popUpMessage, setPopUpMessage] = useState("")
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    // const contentState = useSelector(state => state.content)
    const userState = useSelector(state => state.user)
    const [selectedEntry, setSelectedEntry] = useState(null)
    const callDispathcers = () => {
        dispatch(getAllCompetitions())
        dispatch(fetchUsers())
        dispatch(getUser())

    }

    useEffect(() => {
        callDispathcers()

    }, [])

    if (competitionState.status === "loading" || userState.status === "loading" || userState.status == "loggedOut") {
        return <h1>Loading...</h1>
    }
    // const [judges, setJudges] = useState(competitionState.competitions[id].judges)
    // console.log(competitionState.status);
    const competition = competitionState.competitions[id]

    const availableArticles = userState.loggedInUser.articles;
    // console.log(availableArticles);

    const submitEntry = () => {
        if (selectedEntry === null) {
            setPopUpMessage("براہ کرم ایک انٹری منتخب کریں تاکہ اپلوڈ کرسکیں")
            setOpen(true)
            return
        }
        console.log(selectedEntry._id);
        // console.log(competitionState.competitions[id].entries.find(
        //     comp => comp._id == selectedEntry._id));
        if (competitionState.competitions[id].entries.find(
            comp => comp._id == selectedEntry._id)) {
            alert("already uploaded")
            return
        }
        // dispatch(addEntry({ competitionId: competition._id, entryId: selectedEntry._id,participantId:userState.loggedInUser._id }))
        // callDispathcers()

    }

    return (
        <div className='viewcomp'>
            <div className="viewComp-CompTitle">
                <h3 className="" >
                    {`”  ${competition.name}  “`}
                </h3>
            </div>
            <div className='viewcomp-rest'>
                <p className='viewComp-CompDesc'>
                    {competition.description}
                </p>
                <hr style={{ height: '50%', width: '50%', margin: 'auto', marginTop: '3%' }} />

                <div className="viewComp-YourUploadedStoryDiv">
                    <h4>
                        کہانیاں جو آپ نے اپلوڈ کی ہیں:
                    </h4>
                    <ul className="viewComp-YourUploadedStory">
                        {userState.loggedInUser.articles.map(article => {
                            return <li key={article._id}>{article.title}</li>
                        })}
                    </ul>
                </div>
                <hr style={{ height: '50%', width: '50%', margin: 'auto', marginTop: '3%' }} />
<br />
                <div className="viewComp-CompUpload">
                    <Select
                        className='viewComp-Select'
                        placeholder="
                        اپ لوڈ کرنے کو کہانی منتخب کریں"
                        options={availableArticles.map(article => {
                            // console.log("value = ", article._id, "label = ", article.title);
                            return { value: article, label: article.title }
                        })}
                        onChange={(e) => {
                            setSelectedEntry(e.value)
                        }}
                    >
                    </Select>
                    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className="modal">
                            {popUpMessage}
                        </div>
                        <button onClick={closeModal}>OK</button>
                    </Popup>
                    <button className="viewComp-saveButton" onClick={submitEntry} > Save</button>
                </div>

            </div>




        </div>
    )
}

export default ViewCompetition