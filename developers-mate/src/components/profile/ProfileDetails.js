import React, { useEffect, useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  useGetRequestMutation,
  usePostRequestMutation,
} from "../../redux/PrivateApi";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/UserDetails";
import api from "../../api/ImageApi";
import { BiPencil } from "react-icons/bi";

function ProfileDetails() {
  let formData = new FormData();
  const [postReq] = usePostRequestMutation();
  const userDetails = useSelector((state) => state.userDetails.value);
  const otherUserId = useSelector((state) => state.otherUserId.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const handleChange = async (e) => {
    formData.append("user", localStorage.getItem("userId"));
    formData.append(`${e.target.name}`, e.target.files[0]);
    try {
      const response = await api.patch("profile/profile/", formData);
      setLoading(loading ? false : true);
      dispatch(setUserDetails(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleFollow = async () => {
    postReq({ data: { id: otherUserId }, url: "profile/followers/" })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profileDetails">
      <div className="banner">
        {userDetails && userDetails.banner && (
          <>
            {!otherUserId && (
              <Link to="/profile/editbanner">
                <BiPencil
                  color="white"
                  size={28}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem",
                  }}
                  className="icon"
                />
              </Link>
            )}
            <img src={`http://127.0.0.1:8000${userDetails.banner}`} alt="" />
          </>
        )}
        {userDetails && !userDetails.banner && !otherUserId && (
          <button className="addBannerBtn">
            <MdInsertPhoto size={24} className="icon" />
            <h4 style={{ color: "black", margin: "0" }}>Add Banner</h4>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              name="banner"
              onChange={(e) => {
                handleChange(e);
              }}
              style={{ opacity: "0" }}
            />
          </button>
        )}
      </div>
      <div className="profileImage">
        {userDetails &&
          userDetails.image === "/media/user/default.jpg" &&
          !otherUserId && (
            <button className="addProfilePicBtn">
              <MdInsertPhoto size={24} />
              <h4 style={{ color: "black", margin: "0" }}>Add Profile</h4>
              <input
                type="file"
                name="image"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </button>
          )}
        {userDetails && userDetails.image !== "/media/user/default.jpg" && (
          <img src={`http://127.0.0.1:8000${userDetails.image}`} alt="" />
        )}
        {userDetails &&
          userDetails.image === "/media/user/default.jpg" &&
          otherUserId && (
            <img src={`http://127.0.0.1:8000/media/user/default.jpg`} alt="" />
          )}
      </div>
      {!otherUserId && (
        <Link to="/profile/editintro" style={{ textDecoration: "none" }}>
          <BiEdit color="white" className="editbtn icon" size={24} />
        </Link>
      )}
      <div className="userProfileDetails">
        <h2>
          {userDetails && `${userDetails.first_name} ${userDetails.last_name}`}
        </h2>
        <h4 style={{ fontWeight: "500" }}>
          {userDetails && userDetails.headline}
        </h4>
        {userDetails && (
          <div style={{ display: "flex" }}>
            <Link to={"/followers"} style={{ textDecoration: "none" }}>
              <h6>
                <span
                  style={{
                    marginRight: "0.2rem",
                    color: "orange",
                  }}
                >
                  {userDetails.followers}
                </span>
                Followers
              </h6>
            </Link>
            <Link to={"/following"} style={{ textDecoration: "none" }}>
              <h6>
                <span
                  style={{
                    marginRight: "0.2rem",
                    color: "orange",
                  }}
                >
                  {userDetails.following}
                </span>
                Following
              </h6>
            </Link>
          </div>
        )}
        {otherUserId && (
          <button className="followBtn" onClick={handleFollow}>
            <h4 style={{ color: "white" }}>Follow</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
