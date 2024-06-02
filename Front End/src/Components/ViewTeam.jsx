import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addSharedWork, getAllTeams, getTeamById } from '../slices/teamSlice'
import { fetchUsers, getUser } from '../slices/userSlice'
import Select from "react-select"
import Popup from 'reactjs-popup'

function ViewTeam() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userState = useSelector(state => state.user)
  const teamState = useSelector(state => state.team)
  const { id } = useParams()
  const [selectedSharedWork, setSelectedSharedWork] = useState({})
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);


  const callDispathcers = () => {
    dispatch(getAllTeams())
    dispatch(fetchUsers())
    dispatch(getUser())

  }


  useEffect(() => {
    callDispathcers()
    console.log("rendered");

  }, [])




  if (userState.status == "loading" || teamState.status == "loading") {
    return <h1>Loading...</h1>
  }

  // console.log(teamState.teams);
  // console.log(id);
  const team = teamState.teams.find(team => team._id === id)
  const sharedContent = team.sharedWork.map((content, index) => {
    return { value: index, label: content.title }
  })


  // Another component
  const EditSharedWork = () => {
    const [title, setTitle] = useState(`${selectedSharedWork.title ? selectedSharedWork.title : ""}`)
    const [content, setContent] = useState(`${selectedSharedWork.content ? selectedSharedWork.content : ""}`)

    useEffect(() => { console.log("he2"); }, [])

    const submitSharedContent = (e) => {
      e.preventDefault()
      if (title === "" || content === "") {
        setOpen(true)
        return;
      }
      dispatch(addSharedWork({ teamId: id, title, content, shareId: selectedSharedWork._id }))
      navigate(`/teams`)
    }

    // console.log("team", team.sharedWork);
    // console.log("team", team.sharedWork[0]);
    return <div className="view-team-second-div">
      <form onSubmit={submitSharedContent} action="" className='shared_work_form' >
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className='uploadContent_title'
          placeholder='ٹایٹل'
          value={title}
        />
        <textarea
          placeholder='کہانی یہاں لکھیں'
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
        <button onClick={submitSharedContent}>سیو کریں</button>
      </form>
    </div>

  }


  // console.log("ttem", team);
  return (
    <div className='viewTeam'>
      <div
        className='view-team-first-div'>
        <h2>{team.name}</h2>
        <div className='memberDiv'>
          <h3> {`ممبرز (`}</h3>
          <ul>
            {team.members.map((member, index) => {
              return <li key={index}>{` ${member.name}، `}</li>
            })}
          </ul>
          <h3>{`)`}</h3>
        </div>
      </ div>

      <div className='select-tag'>
        <Select
          placeholder={"مواد کو دیکھنے اور اس پر کام کرنے کے لئے منتخب کریں"}
          // defaultValue={selectedTag}
          onChange={(e) => {
            // console.log(e.value);
            // console.log("e", team.sharedWork[e.value]);
            setSelectedSharedWork(team.sharedWork[e.value])

            console.log("he");
            // setSelectedTag(prevState => {
            //   // console.log(prevState);
            //   if (prevState.includes(e.value)) {
            //     return prevState;
            //   }

            //   return [...prevState, e.value]
            // })

          }}
          options={sharedContent}
        ></Select>
      </div>

      <EditSharedWork />
    </div>
  )
}

export default ViewTeam