import React from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/chat/chat.css";
import img from "../assets/profile/bannerBg.jpg";
import { Link } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox";
import { BsCardImage } from "react-icons/bs";
import { MdSend } from "react-icons/md";

function Chat() {
  return (
    <>
      <PrivateNavbar />
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
          {/* <ChatBox user={false} />
          <ChatBox user={true} />
          <ChatBox user={false} /> */}
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
    </>
  );
}

export default Chat;
