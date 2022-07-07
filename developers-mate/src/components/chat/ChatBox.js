import React from "react";
import "../../style/chat/chatBox.css";
import defaultImg from "../../assets/profile/default.jpg";

function ChatBox({ user, msg, userImage, profileImg }) {
  return (
    <div
      className="chatBoxContainer"
      style={
        user ? { justifyContent: "flex-end" } : { justifyCotent: "flex-start" }
      }
    >
      {!user && (
        <img
          src={`${userImage}`}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = defaultImg;
          }}
        />
      )}
      <div
        className="chatText"
        style={
          user
            ? { borderRadius: "0.6rem 0.6rem 0 0.6rem" }
            : { borderRadius: "0.6rem 0.6rem 0.6rem 0" }
        }
      >
        <h5>{msg}</h5>
      </div>
      {user && (
        <img
          src={profileImg && profileImg}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = defaultImg;
          }}
        />
      )}
    </div>
  );
}

export default ChatBox;
