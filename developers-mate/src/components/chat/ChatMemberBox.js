import React from 'react'
import "../../style/chat/chatMemberBox.css";
import img from "../../assets/profile/bannerBg.jpg"

function ChatMemberBox({itemObj,onclickFnc}) {
  const {second_user_image,second_user,first_user} = itemObj;
  return (
    <div className='member' onClick={()=>onclickFnc(itemObj)}>
        <div className="memberImg">
            <img src={`http://127.0.0.1:8000${second_user_image}`} alt="" />
        </div>
        <h4>{itemObj.first_user_id == localStorage.getItem("userId") ? second_user : first_user}</h4>
        <div className='unreadBox'>
          <p>Unread</p>
        </div>
    </div>
  )
}

export default ChatMemberBox