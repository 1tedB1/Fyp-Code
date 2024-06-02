import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { getAllTags } from '../slices/tagSlice';
import { fetchUsers, getUser } from '../slices/userSlice';
import Popup from "reactjs-popup"
import contentSlice, { createArticle, getAllArticles, updateArticle } from '../slices/contentSlice';
import { useLocation, useNavigate } from 'react-router-dom';


function UploadContent() {
  console.log(localStorage.getItem("token"));

  const [selectedTag, setSelectedTag] = useState([])
  const [prevPart, setPrevPart] = useState(null)
  const [title, setTitle] = useState("")
  const tagSlice = useSelector(state => state.tag)
  // const articleSlice = useSelector(state => state.content)
  const dispatch = useDispatch()
  const userSlice = useSelector(state => state.user)
  const [content, setContent] = useState("")
  const contentState = useSelector(state => state.content)

  const location = useLocation();
  const previousLocation = location.state && location.state.from;
  // console.log("pre" , previousLocation);
  //for modal
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const navigate = useNavigate()

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



  // if(articles  )

  useEffect(() => {
    // console.log("first pr", contentState.selectedArticle ? "j" : "h");
    if (contentState.selectedArticle != null) {
      const selectArt = contentState.selectedArticle
      console.log(selectArt);
      setTitle(selectArt.title)
      setContent(selectArt.content)
      // console.log("tags ", selectArt);
      setSelectedTag(selectArt.tags.map(obj => Object.values(obj)[0]))
      // console.log("hi", selectArt.prevPart? selectArt.prevPart.title : "null");
      setPrevPart(selectArt.prevPart ? selectArt.prevPart._id : null)
      // console.log(contentState.selectedArticle);
    }
  }, [])

  if (contentState.status == "loading" || contentState.status == "idle" ||
    tagSlice.status == "loading" ||
    userSlice.status == "loading" || userSlice.status == "loggedOut"
  ) {
    return;
  }



  // const selectArt = contentState.selectedArticle;



  // add this
  if (!previousLocation) {
    if (contentState.selectedArticle) {
      dispatch(removeSelectedArticle())
    }
  }

  // else{
  //   const selectArticle = contentState.selectedArticle
  //   console.log(selectArticle);
  //   setTitle(selectArticle.title)
  //   setContent(selectArticle.content)
  //   setSelectedTag(selectArticle.tags)
  // }

  let tags = tagSlice.tags.map((value) => {
    // console.log("id = ", value._id);
    return { value: value._id, label: value.value }
  })
  const linkNovels = userSlice.loggedInUser.articles.map((value) => {
    // console.log();
    // console.log(value._id, contentState.selectedArticle._id);
    if (contentState.selectedArticle) {
      console.log("contentstate.selectedArticle._id", contentState.selectedArticle._id, "value._id", value._id);
      console.log("contentState.selectedArticle._id == value._id", contentState.selectedArticle._id == value._id);
      if (contentState.selectedArticle._id == value._id) {
        console.log("for true didn't return ", value.title);
        return { value: "", label: "" };
      }
      else {
        console.log("for false returned  ", value.title);

        return { value: value._id, label: value.title }
      }
    }
    else {
      return { value: value._id, label: value.title }
    }
  })

  const submitArticle = (e) => {
    e.preventDefault()
    if (title == "") {
      setOpen(true)
      return;
    }
    if (content == "") {
      setOpen(true)
      return;
    }

    if (prevPart == "") {
      setOpen(true)
      return;
    }

    const article = {
      title: title,
      tags: selectedTag,
      prevPart: prevPart,
      content: content,
      author: userSlice.loggedInUser._id
    }
    contentState.selectedArticle ? article._id = contentState.selectedArticle._id : null;
    // console.log(article);
    if (contentState.selectedArticle) {
      // console.log("calling update");
      dispatch(updateArticle(article))
    }
    else {
      // console.log("calling create");

      dispatch(createArticle(article))
    }
    // contentState.selectedArticle ?  : 
    runDispatches()
    // navigate("/homepage")
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
          value={title}
        />
        <textarea
          placeholder='کہانی یہاں لکھیں'
          className='uploadContent_content'
          onChange={(e) => {
            setContent(e.target.value)
          }}
          value={content}
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
            // console.log(contentState.selectedArticle.title);
            // console.log("v", e.value);
            setPrevPart(e.value)

          }}
          options={linkNovels}
        ></Select>
        <button className='uploadContent_button' type="submit">{`${contentState.selectedArticle ? " اپ ڈیٹ " : "اپ لوڈ"}`}</button>
      </form>



    </div>
  )
}

export default UploadContent