import React from 'react'
import "../../style/chat/chatMemberBox.css";
import img from "../../assets/profile/bannerBg.jpg"

function ChatMemberBox() {
  return (
    <div className='member'>
        <div className="memberImg">
            <img src={img} alt="" />
        </div>
        <h4>Hello World</h4>
    </div>
  )
}

export default ChatMemberBox