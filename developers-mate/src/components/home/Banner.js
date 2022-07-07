import { React, useEffect, useState } from "react";
import blackBanner from "../../assets/home/blackBanner.jpg";
import "../../style/home/Banner.css";
import { useGetRequestMutation } from "../../redux/PrivateApi";
import defaultImg from "../../assets/profile/default.jpg"

function Banner() {
  const [getUserDetails, responseInfo] = useGetRequestMutation();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    image: null,
    banner: null,
    followers: null,
    following: null,
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
          headline: payload.headline,
          followers: payload.followers,
          following: payload.following,
        });
      });
  }, []);
  return (
    <div className="banner">
      <div className="background-Cover"></div>
      <img
        src={userDetails.banner ? userDetails.banner :  blackBanner}
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =blackBanner ;
        }}
      />
      <div className="profileDetails">
        <div className="profileImg">
          {userDetails.image && (
            <img
              src={`${userDetails.image}`}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultImg;
              }}
            />
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
            {userDetails.headline}
          </h5>
          <div className="followers">
            <h6>
              <span style={{ marginRight: "0.2rem", color: "orange" }}>
                {userDetails.followers}
              </span>
              Followers
            </h6>
            <h6>
              <span style={{ marginRight: "0.2rem", color: "orange" }}>
                {userDetails.following}
              </span>
              Following
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
