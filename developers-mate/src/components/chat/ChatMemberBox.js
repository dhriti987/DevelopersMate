import React from "react";
import "../../style/chat/chatMemberBox.css";
import defaultImg from "../../assets/profile/default.jpg";

function ChatMemberBox({ itemObj, onclickFnc }) {
  const {
    first_user_id,
    second_user_image,
    second_user,
    first_user,
    first_user_seen,
    second_user_seen,
  } = itemObj;
  const isSeen =
    localStorage.getItem("userId") == first_user_id
      ? first_user_seen
      : second_user_seen;
  return (
    <div className="member" onClick={() => onclickFnc(itemObj)}>
      <div className="memberImg">
        <img
          src={`${second_user_image}`}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = defaultImg;
          }}
        />
      </div>
      <h4>
        {itemObj.first_user_id == localStorage.getItem("userId")
          ? second_user
          : first_user}
      </h4>
      {!isSeen && (
        <div className="unreadBox">
          <p>Unread</p>
        </div>
      )}
    </div>
  );
}

export default ChatMemberBox;
