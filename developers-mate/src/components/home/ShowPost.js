import React from "react";
import "../../style/home/ShowPost.css";
import bannerBg from "../../assets/home/banner.jpg";
import LikeButton from "../LikeButton";
import { BiCommentDots } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import ProfileHead from "./ProfileHead";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import {useSelector} from "react-redux";

function ShowPost({ item, isEdit, isPost, setDisplayWarning,setSelectedPostId }) {
  const otherUserId = useSelector((state)=>state.otherUserId.value)
  return (
    <div className="showpostContainer">
      <ProfileHead
        item={item}
        isEdit={isEdit}
        isPost={isPost}
        setDisplayWarning={setDisplayWarning}
      />
      {
        isPost && !otherUserId &&

        <AiFillDelete
          color="white"
          size={28}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "0.5rem",
            top: "0.8rem",
          }}
          onClick={()=>{
            setDisplayWarning(true)
            setSelectedPostId(item.post_id)
          }}
        />
      }
      <div className="body">
        <h4 style={{ color: "rgba(243, 243, 243, 0.8)", fontWeight: "400" }}>
          {item.text}
        </h4>
        {item.image && !otherUserId &&(
          <Link
            Link
            to={isEdit ? "" : `/home/postdetailpopup/${item.post_id}/`}
          >
            <img src={`${item.image}`} alt="" />
          </Link>
        )}
      </div>
      <div className="icons">
        <LikeButton />
        <div className="comment">
          <Link to={`/home/postdetailpopup/${item.post_id}/`}>
            <BiCommentDots size={31} color="rgba(243, 243, 243, 0.8)" />
          </Link>
          <h5 style={{ color: "rgba(156, 145, 145, 0.8)", margin: "0 0.1rem" }}>
            24
          </h5>
        </div>
        <AiOutlineShareAlt
          size={31}
          color="rgba(243, 243, 243, 0.8)"
          style={{ marginBottom: "0.4rem", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default ShowPost;
