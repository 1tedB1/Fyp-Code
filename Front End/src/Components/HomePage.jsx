import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faComment, faThumbsDown, faThumbsUp, faUser, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { getAllArticles, likeArticle, disLikeArticle } from '../slices/contentSlice'
import { getAllFeedBack } from '../slices/feedbackSlice';
import { fetchUsers, getUser } from '../slices/userSlice';
function HomePage() {

  const dispatch = useDispatch()
  const contentState = useSelector(state => state.content)
  const userState = useSelector(state => state.user)

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




  const renderArticles = () => {
    return contentState.articles.map((article, index) => {
      return (
        <Article
          key={index}
          title={article.title}
          id={index}
          content={article.content}
          likes={article.likes}
          dislikes={article.dislikes}
          comments={article.comments}
          views={article.views}>
        </Article>
      )
    })
  }



  // A differen compnent (child)
  function Article({ title, cDate, content, likes, dislikes, comments, views, id }) {
    // likes.forEach(element => {
    //   console.log(element);
    // });
    const [likeCount, setLikeContent] = useState(likes.length)
    const [disLikeCount, setDisLikeCount] = useState(dislikes.length)
    const [liked, setLiked] = useState(likes.find(user => user._id == userState.userId))
    const [disLiked, setDisLiked] = useState(dislikes.find(user => user._id == userState.userId))
    const [classChange, setClassChange] = useState(`${liked?'content_button_selected':''}`)

    if (title == null) {
      title = "حسینوں پہ ہم کو بروسہ نہیں ہے"
    }
    // console.log(id);

    return (
      <div className='article '>
        <NavLink to={`/viewcontent/${id}`} className={"navlink"} >
          <h2 className='article_heading'>{title}</h2>

          <p className='date'>{cDate}</p>
          <p className='article_content'>{content.slice(0, 450) + " ......"}</p>
        </NavLink>
        <div className="article_icons">
          <button
            className={`article_icon ${classChange}`}
            onClick={() => {
              if (liked || contentState.changeInProgress == true) {
                return;
              }
              setClassChange('content_button_selected')
              setLiked(true)
              dispatch(likeArticle({ articleId: contentState.articles[id]._id, userId: userState.userId }))
              
              console.log(contentState);
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
              if ((dislikes.find(user => user._id == userState.userId)) || contentState.changeInProgress == true) {
                return;
              }
              dispatch(disLikeArticle({ articleId: contentState.articles[id]._id, userId: userState.userId }))
              // console.log("hi", contentState.changeInProgress);
              // while (contentState.changeInProgress == true) { console.log("waiting"); }
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


  // Main component
  return (
    <div className='homePage'>
      <div className='loginHeading'>
        <img src="./src/assets/logo.png" alt="" />
        <h1 className=''>خوش آمدید</h1>


      </div>
      {/* <Article title={"ہم تم اور سفر محبت"}></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article> */}
      {renderArticles()}
    </div>
  )
}

export default HomePage