import React from "react";
import "../../style/find-developers/FilteredProfile.css";
import Image from "../../assets/home/banner.jpg";
import { BsChatRightDots } from 'react-icons/bs';

function FilteredProfile() {
  return (
    <div className="filterProfileContainer">
      <div className="leftImageContainer">
        <img src={Image} alt="" />
      </div>
      <div className="rightContainer">
        <h3>Nitin Rajesh</h3>
        <h5 style={{ color: "rgba(243, 243, 243, 0.8)", fontWeight: "normal" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolore
          cum saepe est eos consectetur distinctio .....
        </h5>
      </div>
      <button className="filterProfileBtn">
          <BsChatRightDots size={17} color="white"/>
          <h5>Chat</h5>
      </button>
    </div>
  );
}

export default FilteredProfile;
