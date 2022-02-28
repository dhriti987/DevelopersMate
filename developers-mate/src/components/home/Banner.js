import { React, useEffect, useState } from "react";
import blackBanner from "../../assets/home/blackBanner.jpg";
import "../../style/home/Banner.css";
import { useGetRequestMutation } from "../../redux/PrivateApi";
import profileImg from "../../assets/profile/profile.svg";

function Banner() {
  const [getUserDetails, responseInfo] = useGetRequestMutation();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    image: null,
    banner: null,
  });
  useEffect(async () => {
    await getUserDetails("profile/profile/")
      .unwrap()
      .then((payload) => {
        setUserDetails({
          firstName: payload.first_name,
          lastName: payload.last_name,
          image: payload.image,
          banner: payload.banner,
        });
      });
  }, []);
  return (
    <div className="banner">
      <img
        src={
          userDetails.banner
            ? `http://127.0.0.1:8000${userDetails.banner}`
            : blackBanner
        }
        alt=""
      />
      <div className="profileDetails">
        <div className="profileImg">
          {userDetails.image && (
            <img src={`http://127.0.0.1:8000${userDetails.image}`} alt="" />
          )}
        </div>
        <div className="profileText">
          <h3 style={{ fontWeight: "600" }}>
            {userDetails.firstName} {userDetails.lastName}
          </h3>
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
              <span style={{ marginRight: "0.2rem", color: "orange" }}>19</span>
              Followers
            </h6>
            <h6>
              <span style={{ marginRight: "0.2rem", color: "orange" }}>19</span>
              Following
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
