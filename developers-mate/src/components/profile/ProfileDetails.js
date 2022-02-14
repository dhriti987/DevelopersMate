import React from 'react'
import { MdInsertPhoto } from "react-icons/md";
import profilePic from "../../assets/profile/profile.svg";
import bannerBg from "../../assets/profile/bannerBg.jpg";
import { BiEdit } from "react-icons/bi";
import {Link} from "react-router-dom";


function ProfileDetails() {
  return (
    <div className="profileDetails">
          <div className="banner">
            {/* <img src={bannerBg} alt="" /> */}
            <button className="addBannerBtn">
              <MdInsertPhoto size={24} className="icon" />
              <h4 style={{ color: "black", margin: "0" }}>Add Banner</h4>
              <input type="file" style={{opacity:"0"}}/>
            </button>
          </div>
          <div className="profileImage">
            <img src={profilePic} alt="" />
          </div>
          <Link to="/profile/editintro" style={{ textDecoration: "none" }}>

          <BiEdit color="white" className="editbtn icon" size={24} />
          </Link>
          <div className="userProfileDetails">
            <h2>Nitin Rajesh</h2>
            <h4 style={{ fontWeight: "500" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              inventore iure maiores totam, illo optio nostrum blandi
            </h4>
          </div>
        </div>
  )
}

export default ProfileDetails