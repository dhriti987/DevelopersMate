import React from 'react'
import "../../style/chat/chatBox.css";
import img from "../../assets/profile/bannerBg.jpg";

function ChatBox({user,msg,userImage}) {
  return (
    <div className='chatBoxContainer' style={user ? {justifyContent:"flex-end"} : {justifyCotent:"flex-start"}}>
        {!user && 
        <img src={`http://127.0.0.1:8000${userImage}`} alt="" />
        }
        <div className="chatText" style={user ? {borderRadius:"0.6rem 0.6rem 0 0.6rem"} : {borderRadius:"0.6rem 0.6rem 0.6rem 0"}}>
            <h5>{msg}</h5> 
        </div>
        {user && 
        <img src={img} alt="" />
        }
    </div>
  )
}

export default ChatBox