import React, { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/chat/chat.css";
import img from "../assets/profile/bannerBg.jpg";
import { Link } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox";
import { BsCardImage } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { BsThreeDotsVertical } from 'react-icons/bs';
import ChatMemberBox from "../components/chat/ChatMemberBox";
import {useSelector} from "react-redux";


function Chat() {
  const chatThreads = useSelector((state)=>state.chatThread.value);
  const user = useSelector((state)=>state.userDetails.value);
  const [messagesArr,setMessagesArr] = useState([]);
  const [chattingUser,setChattingUser] = useState(null);

  const showChats = (item)=>{
    setMessagesArr(item.messages)
    setChattingUser({
      chattingUserName : item.first_user_id == localStorage.getItem("userId") ? item.second_user : item.first_user,
      chattingUserimg : item.second_user_image
    })
  }
  return (
    <>
      <PrivateNavbar />
      <main className="chatRoomContainer">
        <div className="chatMembersContainer">
          <div className="chatMemberHead">
            <div className="chatMemberHeadImg">
              <img src={img} alt="" />
            </div>
            <BsThreeDotsVertical size={23} color="white"/>
          </div>
          <div className="chatMembers">
            {
              chatThreads.map((item)=>{
                return <ChatMemberBox  key={item.id} itemObj={item} onclickFnc={showChats}/>
              })
            }
            
          </div>
        </div>
        <main className="ChatContainer">
          {
            chattingUser && 

          <Link className="chatHead" to="/">
            <img src={`http://127.0.0.1:8000${chattingUser.chattingUserimg}`} alt="" />
            <h3>{chattingUser.chattingUserName}</h3>
            <div className="status">
              <div className="circleColor"></div>
              <h6>Online</h6>
            </div>
          </Link>
          }
          {
            chattingUser && 

          <div className="chatContent" style={{height:"25rem"}}>
            {
              messagesArr.map((item)=>{

                return <ChatBox user={item.sent_by_id==localStorage.getItem("userId")} msg={item.message}key={item.id} userImage = {chattingUser.chattingUserimg}/>
              })
            }

          </div>
          }
          {
            chattingUser && 

          <div className="sendContainer">
            <input type="text" placeholder="Write the Message.." />
            <div className="icons">
              <BsCardImage size={23} color="white" />
            </div>
            <div className="sendButton">
              <MdSend size={23} color="white" />
            </div>
          </div>
          }
        </main>
      </main>
    </>
  );
}

export default Chat;
