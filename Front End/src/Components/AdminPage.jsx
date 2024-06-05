import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../slices/contentSlice'
import { fetchUsers, getUser } from '../slices/userSlice'
import Article from './Article'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getAllCompetitions } from '../slices/competitionSlice'

function AdminPage() {
    const contentState = useSelector(state => state.content)
    const userState = useSelector(state => state.user)
    const compState = useSelector(state => state.competition)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const callDispathcers = () => {
        // console.log("calling dispatchers",contentState.changeInProgress);
        dispatch(getAllArticles())
        dispatch(fetchUsers())
        dispatch(getUser())
        dispatch(getAllCompetitions())
        // console.log(userState);
    }


    useEffect(() => {
        callDispathcers()
        // dispatch(getAllFeedBack())
        // console.log(state.articles);
    }, [])




    if (contentState.status == "loading" || contentState.status == "idle"
        || userState.status == "loading" || userState.status == "loggedOut"
        || compState.status == "loading" || compState.status == "loggedOut"

    ) {
        return <h1>Loading...</h1>;
    }



    const RenderUsers = () => {
        return userState.users.map((user, index) => {
            return (

                <div key={user._id} className='buddies-recievedRequests-card user_page_first_div'>
                    <NavLink to={`/viewProfile/${user._id}`}>
                        <h5>{
                            user.name
                        }</h5>
                    </NavLink>
                    <div className='buddies-recievedRequests-card-buttons user_page_fd_buttonD'>
                        <button onClick={(e) => {
                            // dispatch()
                        }
                        } >Delete</button>

                        <button onClick={e => {
                            navigate(`/viewProfile/${user._id}`)
                        }}>
                            View
                        </button>


                    </div>
                </div>
            )
        })

    }

    const RenderContent = () => {
        return contentState.articles.map((article, index) => {
            return (

                <div key={article._id} className='buddies-recievedRequests-card user_page_first_div'>
                    <NavLink to={`/viewContent/${index}`}>
                        <h5>{
                            article.title
                        }</h5>
                    </NavLink>
                    <div className='buddies-recievedRequests-card-buttons user_page_fd_buttonD'>
                        <button onClick={(e) => {

                        }
                        } >delete</button>

                        <button onClick={e => {
                            navigate(`/viewContent/${index}`)
                        }}>
                            view
                        </button>


                    </div>
                </div>

            )
        })
    }

    const RenderCompetition = () => {
        return compState.competitions.map((comp, index) => {
            return (

                <div key={comp._id} className='buddies-recievedRequests-card user_page_first_div'>
                    <NavLink to={`/viewContent/${index}`}>
                        <h5>{
                            comp.name
                        }</h5>
                    </NavLink>
                    <div className='buddies-recievedRequests-card-buttons user_page_fd_buttonD'>
                        <button onClick={(e) => {

                        }
                        } >delete</button>

                        <button onClick={e => {

                        }}>
                            view
                        </button>


                    </div>
                </div>

            )
        })
    }


    return (
        <div className='adminPage'>
            <h4>
                یوزرذ
            </h4>
            <div className='adminPage_users'>

                {<RenderUsers />}
            </div>
            <h4 style={{ marginBottom: "1%" }}>
                آرٹیکلز
            </h4>
            <div className='adminPage_content'>

                {<RenderContent />}
            </div>
            <h4 style={{ marginBottom: "1%" }}>
                مقابلہ جات
            </h4>
            <div className='adminPage_content'>

                {<RenderCompetition />}
            </div>
        </div>
    )
}

export default AdminPage