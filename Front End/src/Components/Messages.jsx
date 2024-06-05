import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteChat, getAllChats, sendChat } from '../slices/chatSlice'
import { fetchUsers, getUser } from '../slices/userSlice'
import Popup from 'reactjs-popup'

function Messages() {


    const { toId } = useParams()
    const dispatch = useDispatch()
    const chatState = useSelector(state => state.chat)
    const userState = useSelector(state => state.user)
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState(null)
    const [interactedUsers, setInteractedUsers] = useState(toId ? [toId] : [])
    const [selected, setSelected] = useState(0)
    const [textToSnd, setTextToSnd] = useState("")
    const scrollableRef = useRef(null);




    const callDispathcers = () => {
        dispatch(fetchUsers())
        dispatch(getUser())
        dispatch(getAllChats())
    }


    useEffect(() => {
        callDispathcers()
    }, [])

    // useEffect(() => {
    //     if (toId) {
    //         setSelectedUser(userState.users.find(u => u._id == toId))
    //         setInteractedUsers([...interactedUsers, toId])
    //     }

    // }, [userState.users])

    useEffect(() => {
        console.log("kdajlfkjdl;");
        if (scrollableRef.current) {
            scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
        }
    }, [selectedUser, textToSnd, chatState.chats]);


    if (chatState.status == "loading" || chatState.status == "idle"
        || userState.status == "loading" || userState.status == "loggedOut"
    ) {
        return <h1>Loading...</h1>;
    }


    const deleteChatForm = (e, id) => {
        dispatch(deleteChat(id))
        callDispathcers()
    }

    const ChatMessage = ({ message, isSent }) => {
        // console.log("ren", message);
        if (!message.text || message.text == "") return null;
        // if(!message == []) return null
        return (
            <div className={`chat-message ${isSent ? 'sent' : 'received'}`}>
                <div className="chat-content">
                    <div className='chat-content-div'>
                        <p>{message.text}</p>
                        {isSent && <p style={{ maxHeight: "1px" }}>
                            <Popup
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
                                    {/* <button onClick={e => { edidtChatForm(e, message._id) }} className="menu-item"> Edit</button> */}
                                    <button onClick={e => { deleteChatForm(e, message._id) }} className="menu-item"> Delete</button>

                                </div>
                            </Popup>
                        </p>}

                    </div>


                    <span className="chat-timestamp">{new Date(message.dateAndTime).toLocaleTimeString()}</span>
                </div>

            </div>
        );
    };



    const ChatList = () => {
        // console.log("in", interactedUsers);

        // console.log(chatState.chats.filter(
        //     chat => { chat.from == userState.loggedInUser._id && chat.to == selectedUser._id }));
        if (interactedUsers.length == 0) return <h1>کوئی پیغام نہیں</h1>

        // console.log(selectedUser);
        if (toId && selectedUser == null) {
            // console.log("dfs", toId);
            setSelectedUser(userState.users.find(u => u._id == toId))
            console.log("d:,", selectedUser);
            // setInteractedUsers([...interactedUsers, selectedUser])
        }

        if (selectedUser == null)
            setSelectedUser(userState.users)
        if (selectedUser == null)
            return <h1>No texts</h1>
        // console.log("se", selectedUser);
        const sentChats = chatState.chats.filter(
            chat => {
                if (!chat) return;
                return chat.from == userState.loggedInUser._id && chat.to == selectedUser._id
            })
        const recievedChats = chatState.chats.filter(chat => chat.to == userState.loggedInUser._id && chat.from == selectedUser._id)


        const combinedChats = sentChats.concat(recievedChats).sort((a, b) => {

            return new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime()
        })

        // console.log("redn");


        return (
            <div className="chat-list scrollable-container" ref={scrollableRef} >
                {
                    combinedChats.map((chat, index) => (

                        <ChatMessage
                            key={index}
                            message={chat}
                            isSent={chat.from === userState.loggedInUser._id}
                        />
                    ))
                }
            </div>
        );
    };




    if (toId) {
        // setInteractedUsers([...interactedUsers, toId])
    }
    chatState.chats.forEach(chat => {
        // if(interactedUsers.includes())
        if (!chat) {
            return;
        }
        // console.log(chat);
        if (chat.from == userState.loggedInUser._id) {
            // console.log("skipped ", chat.from);
        }
        else {
            if (!interactedUsers.includes(chat.from)) {
                setInteractedUsers([...interactedUsers, chat.from])
            }
        }
        if (chat.to == userState.loggedInUser._id) {
            // console.log("skipped ", chat.to);
        }
        else {
            if (!interactedUsers.includes(chat.to)) {
                setInteractedUsers([...interactedUsers, chat.to])
            }
        }
    });





    const Users = () => {

        // setInteractedUsers([...interactedUsers, userState.loggedInUser._id])

        return interactedUsers.map((user, index) => {

            user = userState.users.find(u => u._id == user)
            if (index == 0) {
                // setSelected(0)
                // console.log("user", user);
                // setSelectedId(user)
                // console.log("user2", selectedId);
            }
            return (
                < h5
                    key={index}
                    onClick={(e) => {
                        e.preventDefault()
                        // console.log(index);
                        setSelected(index)
                        // setSelectedId(user)
                        const us = user
                        setSelectedUser(us)

                    }
                    }

                    className={`buddies-recievedRequests-card messageUser ${index == selected ? "selectedUser" : ""}`}>
                    {user.name}
                </h5 >
            )
        })

    }


    const sendChatForm = (e) => {
        if (textToSnd == "") {
            alert("پیغام لکھیں")
            return
        }
        // console.log("e", e);
        e.preventDefault()
        console.log("text = ", textToSnd, "sender ", userState.loggedInUser, "s", selectedUser);
        dispatch(sendChat({ to: selectedUser._id, from: userState.loggedInUser._id, text: textToSnd }))
        // // callDispathcers()
        setTextToSnd("  ")
        // console.log("hi");
    }

    return (
        <>
            <h3 style={{ width: "100%", textAlign: "center" }}> پیغامات کی فہرست</h3>
            <div className='message_page'>
                <div className='message_rightDiv userList'>

                    <>
                        {Users()}

                    </>


                </div>

                <div className='message_leftDiv'>
                    {/* <div> */}
                    {<ChatList />}
                    {/* <h2 style={{ margin: "10%", height: "80%" }}>پیغامات</h2> */}
                    {/* </div> */}
                    <form className='chatBox' onSubmit={sendChatForm}>
                        <input className='chatBox_input' placeholder='میسج لکھیں' value={textToSnd} onChange={e => { setTextToSnd(e.target.value) }} />
                        <button className='chatBox_button'>
                            <FontAwesomeIcon style={{ height: "30px" }} icon={faArrowAltCircleLeft} className='searchIcon' />
                        </button>

                    </form>
                </div>
            </div>
        </>

    )
}

export default Messages