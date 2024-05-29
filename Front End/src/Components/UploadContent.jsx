import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { getAllTags } from '../slices/tagSlice';
import { fetchUsers, getUser } from '../slices/userSlice';
import Popup from "reactjs-popup"
import { createArticle, getAllArticles } from '../slices/contentSlice';


function UploadContent() {
  const [selectedTag, setSelectedTag] = useState([])
  const [prevPart, setPrevPart] = useState(null)
  const [title, setTitle] = useState("")
  const tagSlice = useSelector(state => state.tag)
  const articleSlice = useSelector(state => state.content)
  const dispatch = useDispatch()
  const userSlice = useSelector(state => state.user)
  const [content, setContent] = useState("")

  //for modal
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const runDispatches = () => {
    dispatch(getAllTags())
    dispatch(fetchUsers())
    dispatch(getUser())
    dispatch(getAllArticles())
  }


  useEffect(() => {
    runDispatches()
    // console.log("ran");

  }, [])






  if (tagSlice.status == "loading" ||
    userSlice.status == "loading" || userSlice.status == "loggedOut") {
    return;
  }



  let tags = tagSlice.tags.map((value, index) => {
    // console.log("id = ", value._id);
    return { value: value._id, label: value.value }
  })
  const linkNovels = userSlice.loggedInUser.articles.map((value, index) => {
    return { value: value._id, label: value.title }
  })

  const submitArticle = (e) => {
    e.preventDefault()

    // if(title == ""){
    //   setOpen(true)
    //   return;
    // }

    const article = {
      title: title,
      tags: selectedTag,
      prevPart: prevPart,
      content: content,
      author: userSlice.loggedInUser._id
    }

    // console.log(article);
    dispatch(createArticle(article))
    runDispatches()
    // console.log("adra",articleSlice.articles);


  }


  return (

    <div className='uploadContent'>
      <div className='loginHeading'>
        <img src="./src/assets/logo.png" alt="" />
        <h1 className=''>کہانیاں اپ لوڈ کریں</h1>

      </div>
      <form onSubmit={submitArticle} action="" className='uploadContent_form' >
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className='uploadContent_title'
          placeholder='ٹایٹل'
        />
        <textarea
          placeholder='کہانی یہاں لکھیں'
          contentEditable className='uploadContent_content'
          onChange={(e) => {
            setContent(e.target.value)
          }}

        >
        </textarea>

        {/* The pop up */}
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            براہ کرم عنوان اور مواد کا فیلڈ بھریں۔
          </div>
          <button onClick={closeModal}>OK</button>
        </Popup>
        {/* The pop up */}


        <Select
          placeholder={"ٹیگ"}
          defaultValue={selectedTag}
          onChange={(e) => {
            // console.log(e.value);
            setSelectedTag(prevState => {
              // console.log(prevState);
              if (prevState.includes(e.value)) {
                return prevState;
              }
              
              return [...prevState, e.value]
            })

          }}
          options={tags}
        ></Select>
        <div className="tag_line">
          {
            selectedTag.map((value, index) => {
              return (
                <a key={index}>
                  {`#${tagSlice.tags.find(tag => tag._id == value).value}    `}
                </a>
              )
            })
          }
        </div>
        <Select
          placeholder={"لنک کریں  "}
          defaultValue={prevPart}
          onChange={(e) => {
            setPrevPart(e.value)

          }}
          options={linkNovels}
        ></Select>
        <button className='uploadContent_button' type="submit">اپ لوڈ</button>
      </form>



    </div>
  )
}

export default UploadContent