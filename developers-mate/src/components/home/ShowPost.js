import React from "react";
import "../../style/home/ShowPost.css";
import bannerBg from "../../assets/home/banner.jpg";
import LikeButton from "../LikeButton";
import { BiCommentDots } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import ProfileHead from "./ProfileHead";
import { Link } from "react-router-dom";

function ShowPost() {
  return (
    <div className="showpostContainer">
      <ProfileHead />
      <div className="body">
        <h4 style={{ color: "rgba(243, 243, 243, 0.8)", fontWeight: "400" }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
          labore, alias exercitationem aliquid quo veniam eveniet neque ipsam,
          consectetur illum illo. Quis quia quo sit reiciendis enim, aperiam
          blanditiis officiis?
        </h4>
        <Link to="/home/postdetailpopup">
          <img src={bannerBg} alt="" />
        </Link>
      </div>
      <div className="icons">
        <LikeButton />
        <div className="comment">
          <Link to="/home/postdetailpopup">
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
