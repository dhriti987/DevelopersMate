import React from 'react'
import "../../style/chat/chatMemberBox.css";
import img from "../../assets/profile/bannerBg.jpg"

function ChatMemberBox({itemObj,onclickFnc}) {
  return (
    <div className='member' onClick={()=>onclickFnc(itemObj)}>
        <div className="memberImg">
            <img src={`http://127.0.0.1:8000${itemObj.second_user_image}`} alt="" />
        </div>
        <h4>{itemObj.first_user_id == localStorage.getItem("userId") ? itemObj.second_user : itemObj.first_user}</h4>
    </div>
  )
}

export default ChatMemberBox