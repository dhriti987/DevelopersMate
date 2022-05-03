import React from "react";
import "../../style/find-developers/FilteredProfile.css";
import Image from "../../assets/home/banner.jpg";
import { BsChatRightDots } from 'react-icons/bs';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setOtherUserId} from "../../redux/OtherUserId";

function FilteredProfile({name,headline,userId}) {
  const dispatch = useDispatch();
  console.log(userId);
  return (
    <div className="filterProfileContainer">
      <Link className="leftImageContainer" to="/profile" style={{textDecoration:"none"}} onClick={()=>{
        dispatch(setOtherUserId(userId))
      }}>
        <img src={Image} alt="" />
      </Link>
      <Link className="rightContainer" to="/profile" style={{textDecoration:"none"}} onClick={()=>{
        dispatch(setOtherUserId(userId))
      }}>
        <h3>{name}</h3>
        <h5 style={{ color: "rgba(243, 243, 243, 0.8)", fontWeight: "normal" }}>
          {headline.length<=132 ? `${headline}` : `${headline.substr(0,132)}.....`}
        </h5>
      </Link>
      <button className="filterProfileBtn">
          <BsChatRightDots size={17} color="white"/>
          <h5>Chat</h5>
      </button>
    </div>
  );
}

export default FilteredProfile;
