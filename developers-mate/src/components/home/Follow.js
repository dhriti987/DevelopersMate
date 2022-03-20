import React from "react";
import PrivateNavbar from "../PrivateNavbar";
import "../../style/home/Follow.css";
import profile from "../../assets/home/banner.jpg";
import {Link} from "react-router-dom";

function Follow() {
  return (
    <>
      <PrivateNavbar />

      <main className="postDetailsView">
        <h1>Followers</h1>
        <Link to="/home" className="followContainer">
            <img src={profile} alt="" />
            <div className="text">
                <h3>Nitin Rajesh</h3>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Max</h5>
            </div>
        </Link>
        <Link to="/home" className="followContainer">
            <img src={profile} alt="" />
            <div className="text">
                <h3>Nitin Rajesh</h3>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Max</h5>
            </div>
        </Link>
      </main>
    </>
  );
}

export default Follow;
