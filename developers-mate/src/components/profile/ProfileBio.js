import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {Link} from "react-router-dom";

function ProfileBio() {
  return (
    <div className="bioContainer commonBox">
      <div className="head">
        <h1>Bio</h1>
        <div className="editAddContainer">
        <Link to="/profile/editbio">

          <BiEdit
            color="white"
            size={28}
            style={{ cursor: "pointer" }}
            className="icon"
          />
        </Link>
        </div>
      </div>
      <div className="bioSection">
        <h4>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat nam
          officiis consequuntur quisquam consectetur. Ut, tempore explicabo!
          Quibusdam quos commodi eveniet voluptate veritatis doloribus
          asperiores, dolorum error tempora cumque distinctio. Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Error deserunt quibusdam
          modi debitis eveniet dolorem, similique eligendi illum ullam nihil.
          Perspiciatis unde nulla incidunt laborum fugit eius tempore nam
          inventore!
        </h4>
      </div>
      <div className="showMoreArrow" style={{ margin: "0 auto" }}>
        <AiOutlineDown style={{ cursor: "pointer" }} color="white" size={25} />
      </div>
    </div>
  );
}

export default ProfileBio;
