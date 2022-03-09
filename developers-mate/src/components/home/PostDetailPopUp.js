import React from "react";
import "../../style/home/popUp.css";
import banner from "../../assets/home/banner.jpg";
import LikeButton from "../LikeButton";
import { BiCommentDots } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import ProfileHead from "./ProfileHead";
import CommentSection from "./CommentSection";
import {Link} from "react-router-dom";
import CoverBackground from "../CoverBackground";

function PostDetailPopUp() {
  return (
      <>
      <CoverBackground/>
    <main className="popUp">
      <div className="leftContainer">
        <img src={banner} alt="" />
      </div>
      <div className="rightContainer">
        <Link to="/home">
          <ImCross color="white" size={20} className="cancelBtn"/>
        </Link>
          <ProfileHead />
          <div className="body">
            <h4 style={{fontWeight:"500"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi incidunt ad aspernatur! Deserunt, vero laboriosam alias inventore atque iusto sed animi culpa quas sapiente perferendis voluptates dicta, eius nobis quidem!</h4>
          </div>
        <div className="icons">
          <LikeButton />
          <BiCommentDots size={31} color="rgba(243, 243, 243, 0.8)" style={{cursor: "pointer"}}/>
          <AiOutlineShareAlt
            size={31}
            color="rgba(243, 243, 243, 0.8)"
            style={{ cursor: "pointer",marginLeft: "1.1rem" }}
          />
        </div>
        <div className="userComment">
            <input type="text" placeholder="Comment"/>
            <button>Submit</button>
        </div>
        <div className="commentContainer">
            <CommentSection/>
            <CommentSection/>
            <CommentSection/>
            <CommentSection/>
        </div>
      </div>
    </main>
      </>
  );
}

export default PostDetailPopUp;
