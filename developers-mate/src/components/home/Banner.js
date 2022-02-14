import React from 'react'
import bannerBg from "../../assets/home/banner.jpg";
import profile from "../../assets/profile/profile.svg";
import "../../style/home/Banner.css";

function Banner() {
  return (
    <div className="banner">
            <img src={bannerBg} alt="" />
            <div className="profileDetails">
              <div className="profileImg">
                <img src={profile} alt="" />
              </div>
              <div className="profileText">
                <h3 style={{ fontWeight: "600" }}>Nitin Rajesh</h3>
                <h5
                  style={{
                    fontWeight: "300",
                    color: "rgba(243, 243, 243, 0.8)",
                  }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dignissimos, accusamus nostrum. Reprehenderit sint natus ad,
                  delectus dic
                </h5>
                <div className="followers">
                  <h6>
                    <span style={{ marginRight: "0.2rem", color: "orange" }}>
                      19
                    </span>
                    Followers
                  </h6>
                  <h6>
                    <span style={{ marginRight: "0.2rem", color: "orange" }}>
                      19
                    </span>
                    Following
                  </h6>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Banner