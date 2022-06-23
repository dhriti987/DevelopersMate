import React from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/chat/chat.css";
import img from "../assets/profile/bannerBg.jpg";
import { Link } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox";
import { BsCardImage } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { BsThreeDotsVertical } from 'react-icons/bs';
import ChatMemberBox from "../components/chat/ChatMemberBox";


function Chat() {
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
            <ChatMemberBox/>
            <ChatMemberBox/>
          </div>
        </div>
        <main className="ChatContainer">
          <Link className="chatHead" to="/">
            <img src={img} alt="" />
            <h3>Nitin Rajesh</h3>
            <div className="status">
              <div className="circleColor"></div>
              <h6>Online</h6>
            </div>
          </Link>
          <div className="chatContent" style={{height:"25rem"}}>
            <ChatBox user={false} />
            <ChatBox user={true} />
            <ChatBox user={true} />
          </div>
          <div className="sendContainer">
            <input type="text" placeholder="Write the Message.." />
            <div className="icons">
              <BsCardImage size={23} color="white" />
            </div>
            <div className="sendButton">
              <MdSend size={23} color="white" />
            </div>
          </div>
        </main>
      </main>
    </>
  );
}

export default Chat;
