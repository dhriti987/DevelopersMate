import React from "react";
import "../../style/find-developers/FilteredProfile.css";
import Image from "../../assets/home/banner.jpg";
import { BsChatRightDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUserId } from "../../redux/OtherUserId";
import ChatUser, { setChatUser } from "../../redux/ChatUser";
import { setChatThread } from "../../redux/ChatThreads";
import { useNavigate } from "react-router-dom";
import { useGetRequestMutation } from "../../redux/PrivateApi";
import defaultImg from "../../assets/profile/default.jpg";

function FilteredProfile({ name, headline, userId, userImg }) {
  const dispatch = useDispatch();
  const [getChatThread, response] = useGetRequestMutation();
  const chatThreads = useSelector((state) => state.chatThread.value);
  const navigate = useNavigate();
  const changeChatUser = () => {
    const filteredThread = chatThreads.filter(
      (item) => item.first_user_id == userId || item.second_user_id == userId
    );
    if (filteredThread.length) {
      dispatch(setChatUser(filteredThread[0]));
    } else {
      getChatThread(`chat/get-thread/${userId}`)
        .unwrap()
        .then((payload) => {
          dispatch(setChatThread([...chatThreads, payload]));
          dispatch(setChatUser(payload));
        });
    }
    navigate("/chat");
  };
  return (
    <div className="filterProfileContainer">
      <Link
        className="leftImageContainer"
        to="/profile"
        style={{ textDecoration: "none" }}
        onClick={() => {
          dispatch(setOtherUserId(userId));
        }}
      >
        <img
          src={userImg}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = defaultImg;
          }}
        />
      </Link>
      <Link
        className="rightContainer"
        to="/profile"
        style={{ textDecoration: "none" }}
        onClick={() => {
          dispatch(setOtherUserId(userId));
        }}
      >
        <h3>{name}</h3>
        {headline && (
          <h5
            style={{ color: "rgba(243, 243, 243, 0.8)", fontWeight: "normal" }}
          >
            {headline.length <= 132
              ? `${headline}`
              : `${headline.substr(0, 132)}.....`}
          </h5>
        )}
      </Link>
      {localStorage.getItem("userId") != userId && (
        <button className="filterProfileBtn" onClick={changeChatUser}>
          <BsChatRightDots size={17} color="white" />
          <h5>Chat</h5>
        </button>
      )}
    </div>
  );
}

export default FilteredProfile;
