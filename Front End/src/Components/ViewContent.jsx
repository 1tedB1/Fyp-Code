import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import contentSlice, { articleSelected, deleteContent, getAllArticles, likeArticle, viewArticle } from "../slices/contentSlice";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUser, getUserById } from '../slices/userSlice';
import feedbackSlice, { addFeedback } from '../slices/feedbackSlice';
import Popup from 'reactjs-popup';


function ViewContent() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const contentState = useSelector(state => state.content)
    const userState = useSelector(state => state.user)
    const [newCommentContent, setNewCommentContent] = useState("")
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate()
    const viewed = useRef(false)

    const callDispathcers = () => {
        dispatch(getAllArticles())
        dispatch(fetchUsers())
        dispatch(getUser())
    }
    useEffect(() => {
        callDispathcers()
        // console.log(localStorage.getItem("token"));
        // dispatch(fetchUsers())
    }, [])


    if (contentState.status == "loading" || contentState.status == "idle"
        || userState.status == "loading"
        || feedbackSlice.uploading
    ) {
        return <h1>Loading...</h1>;
    }

    if (!viewed.current) {
        dispatch(viewArticle({
            userId: userState.userId,
            articleId: contentState.articles[id]._id
        }))
        viewed.current = true
        callDispathcers()
    }

    // console.log("userState.loggedInUser", userState.loggedInUser);
    if (userState.loggedInUser)
        if (contentState.articles[id]._id.includes(userState.loggedInUser._id)) {
            setLiked(true)
        }
    dispatch(articleSelected(contentState.articles[id]))

    // let title="", content="", authName="", comments="";
    const article = contentState.articles[id]
    // console.dir(article)
    const { title, content, comments, likes } = article
    // console.log("author ", article.author);
    const authName = userState.users.find(user => user._id == article.author._id).name

    // console.log("test" , authName);
    // console.log("authName = ",authName);
    // console.log("title = ",title, "content = ",content, "comments = ",comments);



    //Comment Component
    function Comment({ auth, content }) {
        const commentAuthor = userState.users.find(user => user._id == auth)
        const { name: commentAuthorName, avatar: commentAuthorImage } = commentAuthor
        return (
            <div className='comment'>
                <div className="comment_user">
                    <img src={commentAuthorImage} alt="" width={'40px'} height={'40px'} />
                    <p>{commentAuthorName}</p>
                </div>
                <p className="comment_content">
                    {content}
                </p>
            </div>
        )
    }

    const renderComments = () => {
        console.log("commments ", comments);
        return comments.map((comment, index) => {
            return <Comment
                key={index}
                auth={comment.owner}
                content={comment.content}
            />
        })
    }


    const editContent = () => {
        // console.log(contentState.selectedArticle);
        navigate("/uploadContent", { state: { from: window.location.pathname } })

    }

    const delContent = () => {

        dispatch(deleteContent(article._id))
        while (contentState.status == "deleting") { console.log("hi") }
        // navigate("/homepage")
    }

    const addComment = (e) => {
        e.preventDefault()
        if (newCommentContent == "اپنی رائیں ہمیں دیں" || newCommentContent == ""
        ) {
            return;
        }
        setNewCommentContent(e.target.children[0].innerText)
        let content = newCommentContent;
        // console.log("to", localStorage.getItem("token"));
        // console.log(userState);
        let owner = userState.userId;
        let targetContent = article._id;
        // console.log("content = ", content, "owner = ", owner, "targetContent = ", targetContent);
        dispatch(addFeedback({ content, owner, targetContent }))
        while (feedbackSlice.uploading) { console.log("uploading..."); }
        callDispathcers()
    }

    return (
        <div className='viewContent'>
            <div style={{
                display: "flex", width: "100%", justifyContent: "space-between"
            }}>
                <h1 className='title'>
                    {title}
                </h1>
                {userState.loggedInUser && <Popup
                    className='menu-popup'
                    trigger={<h2 className="menu-item"> &#8942; </h2>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none' }}
                    arrow={false}
                >
                    <div className="menu">
                        <button onClick={editContent} className="menu-item"> Edit</button>
                        <button onClick={delContent} className="menu-item"> Delete</button>

                    </div>
                </Popup>}
            </div>
            <p className='viewContent_writer'>
                {`از ${authName} `}
            </p>
            <p className='viewContent_content'>
                {content}
            </p>
            {/* <div className='viewContent_user'>
                <div className='viewContent_userDetail'>
                    <img src="./src/assets/logo.png" alt="" width={'60px'} />
                    <p>یوذر</p>
                </div>
                <button>فالو</button>
            </div> */}
            <div className="viewContent_comments">
                <div className='write_comment_div'>
                    <h4 style={{ padding: '3% 3% 0 0' }}>
                        کمنٹس
                    </h4>
                    <form
                        action=""
                        className='comment_form'
                        onSubmit={addComment}
                    >
                        <textarea
                            placeholder='اپنی رائیں ہمیں دیں'
                            onChange={(e) => {
                                setNewCommentContent(e.target.value)
                            }}
                            className='written_comment'
                            value={newCommentContent}
                        >
                        </textarea>
                        <button
                            className="comment_button"
                            type="submit"
                        >شائع کریں</button>
                    </form>
                    <p className='story_likes'>
                        <FontAwesomeIcon onClick={(e) => {
                            if (!userState.loggedInUser) {
                                alert("You need to login to like the article")
                                return;
                            }
                            if (liked) {
                                return;
                            }
                            setLiked(true)
                            dispatch(likeArticle({ articleId: article._id, userId: userState.userId }))
                            callDispathcers()
                        }}
                            icon={faThumbsUp} className={`searchIcon ${liked ? "likeButton" : ""}`} />
                        {likes.length} لایکس</p>
                </div>
                <div className='posted_comments'>
                    {renderComments()}

                </div>
            </div>
        </div>
    )
}

export default ViewContent