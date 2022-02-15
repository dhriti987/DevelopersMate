import React from "react";
import "../../style/home/ProfileHead.css";
import bannerBg from "../../assets/home/banner.jpg";


function ProfileHead() {
  return (
    <div className="head">
      <img src={bannerBg} alt="" />
      <div className="headDetails">
        <h4 style={{ fontWeight: "500", margin: "0 0.3rem" }}>Nitin Rajesh</h4>
        <h5
          style={{
            fontWeight: "300",
            color: "rgba(243, 243, 243, 0.8)",
            margin: "0 0.3rem",
            lineHeight: "0.9rem",
          }}
        >
          3days ago
        </h5>
      </div>
    </div>
  );
}

export default ProfileHead;
