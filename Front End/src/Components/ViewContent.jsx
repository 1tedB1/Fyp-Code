import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { articleSelected, getAllArticles } from "../slices/contentSlice";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUserById } from '../slices/userSlice';

function ViewContent() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const contatnState = useSelector(state => state.content)

    const [author, setAuthor] = useState(null)
    const [authorName, setAuthorName] = useState("")
    useEffect(() => {
        dispatch(getAllArticles())
        dispatch(articleSelected(id))
        // dispatch(fetchUsers())
    }, [])
    const userState = useSelector(state => state.user)
    // const getUserById = (id)=>{
    //     userState.users.forEach(element => {
    //         if(element._id == id){

    //             return element;
    //         }
    //     });
    // }
    // const [article, setArticle] = useState()
    const article = contatnState.articles[id]
    console.log(article);

    useEffect(() => {
        // setAuthor(getUserById(article.author))
        // setAuthorName(author.name)
    }, [userState])
    let title, content, authName;
    try {
        title = article.title
        content = article.content
        authName = article.author.name
    } catch (error) {
        console.log("Well done");
    }
    // const author = dispatch(getUserById(article.author))
    // const authorName = author.name;


    // const { title, content } = article
    // console.log(title, content);
    //Comment Component
    function Comment() {
        return (
            <div className='comment'>
                <div className="comment_user">
                    <img src="./src/assets/logo.png" alt="" width={'40px'} height={'40px'} />
                    <p>یوذر</p>
                </div>
                <p className="comment_content">
                    پسند ہے" نائیلہ کو اندازہ تھا کہ یہ بحث کہاں جائے گی ورنہ مجال کہ وہ اپنی اولاد کے ساتھ کھڑی نہ ہوتی "بھابھی رشتہ تو بھائی صاحب نے کیا تھا، پھر میں" "بھائی صاحب مر گئے، تم اپنا بتاؤ" "چچی یہ کیا" کامران کا غصہ اب الجھن میں بدل گیا تھا۔ "نہیں بھابھی"
                </p>
            </div>
        )
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
                    <form action="" className='comment_form'>
                        <span
                            contentEditable
                            className='written_comment'
                            onClick={(e) => {
                                let checkText = e.target.innerText;
                                if (checkText == "اپنی رائیں ہمیں دیں") {
                                    e.target.innerText = ""
                                }
                            }}
                        >
                            اپنی رائیں ہمیں دیں
                        </span>
                        <button className="comment_button" type="submit">شائع کریں</button>
                    </form>
                    <p className='story_likes'>
                        <FontAwesomeIcon icon={faThumbsUp} className='searchIcon' />
                        21، لایکس</p>
                </div>
                <div className='posted_comments'>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />

                </div>
            </div>
        </div>
    )
}

export default ViewContent