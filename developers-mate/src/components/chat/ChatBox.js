import React from 'react'
import "../../style/chat/chatBox.css";
import img from "../../assets/profile/bannerBg.jpg";

function ChatBox({user}) {
  return (
    <div className='chatBoxContainer' style={user ? {justifyContent:"flex-end"} : {justifyCotent:"flex-start"}}>
        {!user && 
        <img src={img} alt="" />
        }
        <div className="chatText" style={user ? {borderRadius:"0.6rem 0.6rem 0 0.6rem"} : {borderRadius:"0.6rem 0.6rem 0.6rem 0"}}>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, assumenda quam accusamus earum, vo</h5> 
        </div>
        {user && 
        <img src={img} alt="" />
        }
    </div>
  )
}

export default ChatBox