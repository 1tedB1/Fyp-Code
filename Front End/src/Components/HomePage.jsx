import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faComment, faThumbsDown, faThumbsUp, faUser, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { getAllArticles, likeArticle, disLikeArticle } from '../slices/contentSlice'
import { getAllFeedBack } from '../slices/feedbackSlice';
import { fetchUsers, getUser } from '../slices/userSlice';
import Article from './Article'
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
    || userState.status == "loading"
  ) {
    return <h1>Loading...</h1>;
  }




  const renderArticles = () => {
    return contentState.articles.map((article, index) => {
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



  // A differen compnent (child)


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