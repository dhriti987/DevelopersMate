import React from "react";
import "../../style/home/ProfileHead.css";
import bannerBg from "../../assets/home/banner.jpg";


function ProfileHead({item}) {
  return (
    <div className="head">
      <img src={`http://127.0.0.1:8000${item.user_image}`} alt="" />
      <div className="headDetails">
        <h4 style={{ fontWeight: "500", margin: "0 0.3rem" }}>{item.user}</h4>
        <h5
          style={{
            fontWeight: "300",
            color: "rgba(243, 243, 243, 0.8)",
            margin: "0 0.3rem",
            lineHeight: "0.9rem",
          }}
        >
          {item.post_date}
        </h5>
      </div>
    </div>
  );
}

export default ProfileHead;
