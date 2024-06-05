import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../slices/contentSlice'
import { fetchUsers, getUser } from '../slices/userSlice'
import Article from './Article'
import { NavLink, useNavigate, useParams } from 'react-router-dom'


function ViewProfile() {

    const {id} = useParams()
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

    const user = userState.users.find(user => user._id == id);
    console.log("user",user);
    const userName = user.name


    const renderArticles = () => {
        // console.log(constes);
        if ((contentState.articles.filter(a => a.atuhor == user.id)).length == 0) {
            console.log("hi");
            return <div className='article'>
                <h3 style={{ textAlign: "center", width: "100%" }}>
                    No articles found
                    <NavLink to={"/uploadContent"}>
                        <p style={{width:"100%"}}>
                            اپ لوڈ آرٹیکل
                        </p>
                    </NavLink>

                </h3>

            </div>

        }
        return contentState.articles.map((article, index) => {
            // console.log(article.author._id, user._id);
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
                        cDate={article.createdAt}
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
                        onClick={e => {
                            window.open(e.target.src, '_blank');
                        }}
                        className="profile-pic"
                        src="src\\assets\\user.jpg"
                        alt="dfdf" />
                    <h4>{userName} </h4>
                </div>
                <div className='main-profile-firstDiv-buttons'>
                    {/* <button onClick={() => {
                        
                    }}>Block</button> */}
                    {/* <button onClick={() => {}}>Pair Request</button> */}
                    <button onClick={() => {navigate(`/messages/${user._id}`)}}>Message</button>
                    {/* <button onClick={() => { navigate('/teams') }}>Teams</button> */}
                </div>
            </div>

            <div className='main-profile-secondDiv'>
                {renderArticles()}
            </div>
        </div>
    )
}

export default ViewProfile