import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { articleSelected, getAllArticles, viewArticle } from "../slices/contentSlice";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUser, getUserById } from '../slices/userSlice';
import feedbackSlice, { addFeedback } from '../slices/feedbackSlice';


function ViewContent() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const contentState = useSelector(state => state.content)
    const userState = useSelector(state => state.user)
    const [newCommentContent, setNewCommentContent] = useState("")

    const viewed = useRef(false)

    const callDispathcers = () => {
        dispatch(getAllArticles())
        dispatch(fetchUsers())
        dispatch(articleSelected(id))
        dispatch(getUser())
    }
    useEffect(() => {
        callDispathcers()
        // console.log(localStorage.getItem("token"));
        // dispatch(fetchUsers())
    }, [])


    if (contentState.status == "loading" || contentState.status == "idle"
        || userState.status == "loading" || userState.status == "loggedOut"
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
        while(feedbackSlice.uploading){console.log("uploading...");}
        callDispathcers()
    }

    return (
        <div className='viewContent'>
            <h1 className='title'>
                {title}
            </h1>
            <p className='viewContent_writer'>
                {`از ${authName} `}
            </p>
            <p className='viewContent_content'>
                {content}
            </p>
            <div className='viewContent_user'>
                <div className='viewContent_userDetail'>
                    <img src="./src/assets/logo.png" alt="" width={'60px'} />
                    <p>یوذر</p>
                </div>
                <button>فالو</button>
            </div>
            <div className="viewContent_comments">
                <div className='write_comment_div'>
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
                        <FontAwesomeIcon icon={faThumbsUp} className='searchIcon' />
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