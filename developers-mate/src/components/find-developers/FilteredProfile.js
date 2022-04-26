import React from "react";
import "../../style/find-developers/FilteredProfile.css";
import Image from "../../assets/home/banner.jpg";
import { BsChatRightDots } from 'react-icons/bs';

function FilteredProfile({name,headline}) {

  return (
    <div className="filterProfileContainer">
      <div className="leftImageContainer">
        <img src={Image} alt="" />
      </div>
      <div className="rightContainer">
        <h3>{name}</h3>
        <h5 style={{ color: "rgba(243, 243, 243, 0.8)", fontWeight: "normal" }}>
          {headline.length<=132 ? `${headline}` : `${headline.substr(0,132)}.....`}
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
