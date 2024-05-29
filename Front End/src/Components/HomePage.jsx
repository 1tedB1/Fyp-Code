import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faComment, faThumbsDown, faThumbsUp, faUser, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { getAllArticles } from '../slices/contentSlice'
import { getAllFeedBack } from '../slices/feedbackSlice';
function HomePage() {

  const dispatch = useDispatch()
  const state = useSelector(state => state.content)

  useEffect(() => {
    dispatch(getAllArticles())
    // dispatch(getAllFeedBack())
    console.log(state.articles);
  }, [dispatch])

  useEffect(() => {
    console.log(state.articles);
  }, [state])




  const renderArticles = () => {
    return state.articles.map((article, index) => {
      return (
        <Article
          key = {index}
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




  function Article({ title, cDate, content, likes, dislikes, comments, views,id }) {
    if (title == null) {
      title = "حسینوں پہ ہم کو بروسہ نہیں ہے"
    }
    console.log(id);

    return (
      <div className='article '>
        <NavLink to={`/viewcontent/${id}`} className={"navlink"} state={{ title: title }}>
          <h2 className='article_heading'>{title}</h2>
        </NavLink>
        <p className='date'>{cDate}</p>
        <p className='article_content'>{content.slice(0, 450) + " ......"}</p>
        <div className="article_icons">
          <button className='article_icon'><FontAwesomeIcon className={'article_icon_img'} icon={faThumbsUp} /><p>لائک{`(${likes.length})`}</p></button>
          <button className='article_icon'><FontAwesomeIcon className={'article_icon_img'} icon={faThumbsDown} /><p>ڈس لائک{`(${dislikes.length})`}</p></button>
          <button className='article_icon'><FontAwesomeIcon className={'article_icon_img'} icon={faComment} /><p>کمنٹ{`(${comments.length})`}</p></button>
          <button className='article_icon'><FontAwesomeIcon className={'article_icon_img'} icon={faChartBar} /><p>{`(${views.length})`}</p></button>
        </div>
      </div>
    )
  }
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