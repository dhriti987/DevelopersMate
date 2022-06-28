import React, { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/chat/chat.css";
import img from "../assets/profile/bannerBg.jpg";
import { Link } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox";
import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { MdSend } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChatMemberBox from "../components/chat/ChatMemberBox";
import { setOtherUserId } from "../redux/OtherUserId";
import {useGetRequestMutation} from "../redux/PrivateApi";
import { setUserDetails } from "../redux/UserDetails";
import noChat from "../assets/chat/noChat.jpg";

function Chat({ client }) {
  const chatThreads = useSelector((state) => state.chatThread.value);
  const chatUser = useSelector((state) => state.chatUser.value);
  const userDetails = useSelector((state) => state.userDetails.value);
  const [getReq] = useGetRequestMutation();
  const [messagesArr, setMessagesArr] = useState([]);
  const [chattingUser, setChattingUser] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const sendMessage = () => {
    if(message.length){

      client.send(
        JSON.stringify({
          message: message,
          thread_id: chattingUser.threadId,
        })
      );
    }
  };
  useEffect(() => {
    dispatch(setOtherUserId(null));
    getReq("profile/profile")
    .unwrap()
    .then((payload)=>{
      dispatch(setUserDetails(payload));
    })
  }, []);
  useEffect(() => {
    if (chattingUser) {
      const threadMessage = chatThreads.filter(
        (item) => chattingUser.threadId == item.id
      );
      setMessagesArr(threadMessage[0].messages);
      setMessage("");
    }
  }, [chatThreads]);

  useEffect(() => {
    if (chatUser) showChats(chatUser);
  }, [chatUser]);

  const showChats = (item) => {
    setMessagesArr(item.messages);
    setChattingUser({
      chattingUserName:
        item.first_user_id == localStorage.getItem("userId")
          ? item.second_user
          : item.first_user,
      chattingUserimg: item.second_user_image,
      threadId: item.id,
      chattingUserId:
        item.first_user_id == localStorage.getItem("userId")
          ? item.second_user_id
          : item.first_user_id,
    });
  };
  return (
    <>
      <PrivateNavbar />
      <main className="chatRoomContainer">
        <div className="chatMembersContainer">
          <div className="chatMemberHead">
            <div className="chatMemberHeadImg">
              <img src={userDetails && userDetails.image} alt="" />
            </div>
            <BsThreeDotsVertical size={23} color="white" />
          </div>
          <div className="chatMembers">
            {chatThreads.map((item) => {
              return (
                <ChatMemberBox
                  key={item.id}
                  itemObj={item}
                  onclickFnc={showChats}
                />
              );
            })}
          </div>
        </div>
        <main className="ChatContainer" style={!chattingUser ? {display:"flex",alignItems:"center",justifyContent:"center"} : {}}>
          {!chattingUser && 
          <div className="emptyChat">
            <div className="emptyChatImg">
              <img src={noChat} alt="" />
            </div>
            <h2>Developer's mate Chat Room</h2>
          </div>
          }
          {chattingUser && (
            <Link
              className="chatHead"
              to="/profile"
              onClick={() => {
                dispatch(setOtherUserId(chattingUser.chattingUserId));
              }}
            >
              <img
                src={`http://127.0.0.1:8000${chattingUser.chattingUserimg}`}
                alt=""
              />
              <h3>{chattingUser.chattingUserName}</h3>
            </Link>
          )}
          {chattingUser && (
            <div className="chatContent" style={{ height: "25rem" }}>
              {messagesArr.map((item) => {
                return (
                  <ChatBox
                    user={item.sent_by_id == localStorage.getItem("userId")}
                    msg={item.message}
                    key={item.id}
                    userImage={chattingUser.chattingUserimg}
                  />
                );
              })}
            </div>
          )}
          {chattingUser && (
            <div className="sendContainer">
              <input
                type="text"
                placeholder="Write the Message.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={!message.length ? {width:"100%",borderRadius:"5px"} : {}}
              />
              {/* <div className="icons">
              <BsCardImage size={23} color="white" />
            </div> */}
            
              <div className="sendButton" onClick={sendMessage} style={message.length<=0 ? {opacity:"0",cursor:"auto"} : {opacity:"1"}} disable>
                <MdSend size={23} color="white" />
              </div>
            </div>
          )}
        </main>
      </main>
    </>
  );
}

export default Chat;
