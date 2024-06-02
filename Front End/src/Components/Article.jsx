import { faChartBar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { disLikeArticle, likeArticle } from '../slices/contentSlice'


function Article({ callDispathcers, contentState, userState, title, cDate, content, likes, dislikes, comments, views, id }) {
    // likes.forEach(element => {
    //   console.log(element);
    // });
    const dispatch = useDispatch()
    const [likeCount, setLikeContent] = useState(likes.length)
    const [disLikeCount, setDisLikeCount] = useState(dislikes.length)
    const [liked, setLiked] = useState(likes.find(user => user._id == userState.userId))
    const [disLiked, setDisLiked] = useState(dislikes.find(user => user._id == userState.userId))
    const [classChange, setClassChange] = useState(`${liked ? 'content_button_selected' : ''}`)
    const loggedInUser = userState.loggedInUser;
    console.log(cDate);
    if (title == null) {
        title = "حسینوں پہ ہم کو بھروسہ نہیں ہے"
    }
    cDate = new Date(cDate);
    console.log(cDate.year);
    // console.log(id);

    return (
        <div className='article '>
            <NavLink to={`/viewcontent/${id}`} className={"navlink"} >
                <div className='article_heading_div'>
                    <h2 className='article_heading'>{title}</h2>
                </div>
                <p className='date'>{`${cDate.getFullYear()}-${String(cDate.getMonth() + 1).padStart(2, "0")}-${String(cDate.getDate()).padStart(2, "0")}`}</p>
                <p className='article_content'>{content.slice(0, 450) + " ......"}</p>
            </NavLink>
            <div className="article_icons">
                <button
                    className={`article_icon ${classChange}`}
                    onClick={() => {
                        if(!loggedInUser){
                            alert("You need to login to like the article")
                            return;
                        }
                        if (liked || contentState.changeInProgress == true) {
                            return;
                        }
                        setClassChange('content_button_selected')
                        setLiked(true)
                        dispatch(likeArticle({ articleId: contentState.articles[id]._id, userId: userState.userId }))
                        while (contentState.changeInProgress == true) { console.log("waiting") }
                        callDispathcers()
                        if (disLiked == true) setDisLiked(false)
                        setLiked(true)
                        setLikeContent(likeCount + 1)
                    }}
                >
                    <FontAwesomeIcon className={'article_icon_img'}
                        icon={faThumbsUp} />
                    <p>لائک{`(${likeCount})`}</p>
                </button>
                <button
                    className={`article_icon ${(disLiked) ? 'content_button_selected' : ''}`}
                    onClick={() => {
                        if(!loggedInUser){
                            alert("You need to login to like the article")
                            return;
                        }
                        if ((dislikes.find(user => user._id == userState.userId)) || contentState.changeInProgress == true) {
                            return;
                        }
                        dispatch(disLikeArticle({ articleId: contentState.articles[id]._id, userId: userState.userId }))
                            callDispathcers()
                        if (liked == true) setLiked(false)
                        setDisLiked(true)
                        setDisLikeCount(disLikeCount + 1)
                    }}>
                    <FontAwesomeIcon className={'article_icon_img'}
                        icon={faThumbsDown} />
                    <p>ڈس لائک{`(${dislikes.length})`}</p>
                </button>
                <button
                    className='article_icon'>
                    <FontAwesomeIcon className={'article_icon_img'}
                        icon={faChartBar} />
                    <p>{`(${views.length})`}</p>
                </button>
            </div>
        </div>
    )
}


export default Article
