import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, getUser } from '../slices/userSlice'
import { deleteTeam, getAllTeams, getUserTeams } from '../slices/teamSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Select from "react-select";

function Teams() {


  const userState = useSelector(state => state.user)
  const dispatch = useDispatch()
  const teamState = useSelector(state => state.team)

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const navigate = useNavigate()
  // const [availableUsers, setAvailableUsers] = useState({user: "ali"})
  const availableUsers = {}

  const callDispathcers = () => {
    dispatch(getAllTeams())
    dispatch(fetchUsers())
    dispatch(getUser())

  }


  useEffect(() => {
    callDispathcers()

  }, [])




  if (userState.status == "loading" || teamState.status == "loading") {
    return <h1>Loading...</h1>
  }
  const members = (teamState.teams.map(team => team.members))
  const userTeams = []
  teamState.teams.forEach(element => {

    element.members.forEach(el => {
      // console.log("inn", el);
      if (el._id == userState.loggedInUser._id) {
        userTeams.push(element)
      }
    })
  });
  // console.log("mem", userTeams);




  function deleteThisTeam(id) {
    // setTeamsLength(teamsLength - 1)
    dispatch(deleteTeam(id))
  }


  const Team = () => {
    // const [teamsLength , setTeamsLength] = useState(userTeams.length)
    if (userTeams.length == 0) {
      return (
        <div className='main-profile-firstDiv team-div'>
          <h4 style={{textAlign:"center", width:"100%"}}>آپ کسی ٹیم میں نہیں</h4>
        </div>
      )
    }
    return userTeams.map((team, index) => {
      // console.log("team", team);
      const members = team.members.map(member => member._id)
      const availableUsersToAdd = userState.users.filter(user => !members.includes(user._id))
      // console.log("av", availableUsersToAdd);

      return (
        <div
          className='main-profile-firstDiv team-div'
          key={index}>
          <div className='team-intro-div'>
            <NavLink to={`/viewTeam/${team._id}`} className={"navlink"} >
              <h4 className='teamTitle'>{team.name}</h4>
            </NavLink>
            <ul>
              {team.members.map((member, index) => {
                return <li key={index}>{` ${member.name}، `}</li>
              })}
            </ul>
          </div>
          <div className='main-profile-firstDiv-buttons team-buttons'>
            <button onClick={() => {
              navigate(`/viewTeam/${team._id}`)
            }}>View Work</button>

            <button onClick={() => deleteThisTeam(team._id)}>Delete</button>

          </div>

        </div>
      )
    })
  }





  return <div style={{ padding: "5% 10%" }} className='main-profile team-page'>
    <div className='main-profile-firstDiv'>
      <h4>ٹیمز بنائیں اور اپنے دوستوں کے ساتھ کام کریں</h4>
      <div className='main-profile-firstDiv-buttons team-buttons'>
        <button onClick={() => { navigate('/createTeam') }} >Create Team</button>
      </div>
    </div>

    <h1 style={{ margin: "2% 1%" }}>آپ کی ٹیمز</h1>

    <Team></Team>
    {/* The pop up */}

    {/* The pop up */}
  </div>


}

export default Teams