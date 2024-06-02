import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../slices/contentSlice'
import { fetchUsers, getUser } from '../slices/userSlice'
import Article from './Article'
import { useNavigate } from 'react-router-dom'


function MainProfile() {


    const dispatch = useDispatch()
    const contentState = useSelector(state => state.content)
    const userState = useSelector(state => state.user)
    const navigate = useNavigate()


    const callDispathcers = () => {
        // console.log("calling dispatchers",contentState.changeInProgress);
        dispatch(getAllArticles())
        dispatch(fetchUsers())
        dispatch(getUser())
        // console.log(userState);
    }


    useEffect(() => {
        callDispathcers()
        // dispatch(getAllFeedBack())
        // console.log(state.articles);
    }, [])




    if (contentState.status == "loading" || contentState.status == "idle"
        || userState.status == "loading" || userState.status == "loggedOut"
    ) {
        return <h1>Loading...</h1>;
    }

    const user = userState.loggedInUser;
    const userName = user.name


    const renderArticles = () => {
        return contentState.articles.map((article, index) => {
            if (article.author._id == user._id)
                return (

                    <Article
                        callDispathcers={callDispathcers}
                        contentState={contentState}
                        userState={userState}
                        key={index}
                        title={article.title}
                        id={index}
                        content={article.content}
                        likes={article.likes}
                        dislikes={article.dislikes}
                        comments={article.comments}
                        views={article.views}
                        cDate = {article.createdAt}
                        >
                    </Article>
                )
        })
    }


    return (
        <div className='main-profile'>
            <div className='main-profile-firstDiv'>
                <div>
                    <img 
                    onClick={e=>{
                        window.open(e.target.src, '_blank');
                    }}
                    className="profile-pic"
                    src="src\\assets\\user.jpg" 
                    alt="dfdf" />
                    <h4>{userName} </h4>
                </div>
                <div className='main-profile-firstDiv-buttons'>
                    <button>Buddies</button>
                    <button onClick={()=>navigate('/editProfile')}>Edit</button>

                    <button onClick={()=>{navigate('/teams')}}>Teams</button>
                </div>
            </div>

            <div className='main-profile-secondDiv'>
                {renderArticles()}
            </div>
        </div>
    )
}

export default MainProfile