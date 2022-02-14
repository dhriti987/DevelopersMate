import React from 'react'
import "../../style/home/ShowPost.css";
import bannerBg from "../../assets/home/banner.jpg";
import LikeButton from '../LikeButton';
import { BiCommentDots } from 'react-icons/bi';
import { AiOutlineShareAlt } from 'react-icons/ai';

function ShowPost() {
  return (
    <div className='showpostContainer'>
        <div className="head">
            <img src={bannerBg} alt="" />
            <div className="headDetails">
                <h4 style={{fontWeight:"500",margin:"0 0.3rem"}}>Nitin Rajesh</h4>
                <h5 style={{fontWeight:"300",color:"rgba(243, 243, 243, 0.8)",margin:"0 0.3rem",lineHeight:"0.9rem"}}>3days ago</h5>
            </div>
        </div>
        <div className="body">
            <h4 style={{color:"rgba(243, 243, 243, 0.8)",fontWeight:"400"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam labore, alias exercitationem aliquid quo veniam eveniet neque ipsam, consectetur illum illo. Quis quia quo sit reiciendis enim, aperiam blanditiis officiis?</h4>
            <img src={bannerBg} alt="" />
        </div>
        <div className="icons">
            <LikeButton/>
            <div className="comment">
                <BiCommentDots size={31} color="rgba(243, 243, 243, 0.8)"/>
                <h5 style={{color:"rgba(156, 145, 145, 0.8)",margin:"0 0.1rem"}}>24</h5>
            </div>
            <AiOutlineShareAlt size={31} color="rgba(243, 243, 243, 0.8)"/>
        </div>
    </div>
  )
}

export default ShowPost