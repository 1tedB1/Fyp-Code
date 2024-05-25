import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faComment, faThumbsDown, faThumbsUp, faUser, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
function HomePage() {



  function getArticles() {



    fetch('/api/articles')
      .then(response => response.json())
      .then(data => {
        // Process the data and update the state or do something with it
      })
      .catch(error => {
        // Handle the error
      });



      
  }









  function Article({ title }) {
    if (title == null) {
      title = "حسینوں پہ ہم کو بروسہ نہیں ہے"
    }
    return (
      <div className='article '>
        <NavLink to="/viewcontent" className={"navlink"} state={{ title: title }}>
          <h2 className='article_heading'>{title}</h2>
        </NavLink>
        <p className='date'>2 جون 2023</p>
        <p className='article_content'>حسینوں پہ ہم کو بروسہ نہیں  نہیں نہیں نہیں نہیں نہیں نہیں نہیں نہیں نہیں حسینوں پہ ہم کو بروسہ نہیں  نہیں نہیں نہیں نہیں نہیں نہیں نہیں نہیں نہیں نہیں نہیں ہے</p>
        <div className="article_icons">
          <button className='article_icon'><FontAwesomeIcon icon={faThumbsUp} /><p>لائک</p></button>
          <button className='article_icon'><FontAwesomeIcon icon={faThumbsDown} /><p>ڈس لائک</p></button>
          <button className='article_icon'><FontAwesomeIcon icon={faComment} /><p>کمنٹ</p></button>
          <button className='article_icon'><FontAwesomeIcon icon={faChartBar} /><p>234</p></button>
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
      <Article title={"ہم تم اور سفر محبت"}></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>

    </div>
  )
}

export default HomePage