import React, { useEffect, useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  useGetRequestMutation,
  usePostRequestMutation,
  useDeleteRequestMutation,
} from "../../redux/PrivateApi";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/UserDetails";
import api from "../../api/ImageApi";
import { BiPencil } from "react-icons/bi";
import defaultImg from "../../assets/profile/default.jpg";
import error from "../../assets/profile/default.jpg";
import ApiLoading from "../ApiLoading";

function ProfileDetails() {
  let formData = new FormData();
  const [postReq] = usePostRequestMutation();
  const [deleteReq] = useDeleteRequestMutation();
  const userDetails = useSelector((state) => state.userDetails.value);
  const otherUserId = useSelector((state) => state.otherUserId.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    formData.append("user", localStorage.getItem("userId"));
    formData.append(`${e.target.name}`, e.target.files[0]);
    try {
      setLoading(true);
      const response = await api.patch("profile/profile/", formData);
      setLoading(false);
      dispatch(setUserDetails(response.data));
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!userDetails.is_followed) {
      postReq({ data: { id: otherUserId }, url: "profile/followers/" })
        .unwrap()
        .then((payload) => {
          dispatch(
            setUserDetails({
              ...userDetails,
              is_followed: true,
              followers: userDetails.followers + 1,
            })
          );
        });
    } else {
      deleteReq(`profile/followers/?id=${otherUserId}`)
        .unwrap()
        .then((payload) => {
          dispatch(
            setUserDetails({
              ...userDetails,
              is_followed: false,
              followers: userDetails.followers - 1,
            })
          );
        });
    }
  };
  return (
    <>
    {
      loading && 
      <ApiLoading/>
    }
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
              <img src={`${userDetails.banner}`} alt="" />
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
            userDetails.image.includes("user/default.jpg") &&
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
          {userDetails && !userDetails.image.includes("user/default.jpg") && (
            <img
              src={`${userDetails.image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultImg;
              }}
            />
          )}
          {userDetails &&
            userDetails.image.includes("user/default.jpg") &&
            otherUserId && (
              <img
                src={defaultImg}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultImg;
                }}
              />
            )}
        </div>
        {!otherUserId && (
          <Link to="/profile/editintro" style={{ textDecoration: "none" }}>
            <BiEdit color="white" className="editbtn icon" size={24} />
          </Link>
        )}
        <div className="userProfileDetails">
          <h2>
            {userDetails &&
              `${userDetails.first_name} ${userDetails.last_name}`}
          </h2>
          <h4 style={{ fontWeight: "500" }}>
            {userDetails && userDetails.headline}
          </h4>
          {userDetails && (
            <div style={{ display: "flex" }}>
              <Link
                to={`${otherUserId ? "/profile" : "/followers"}`}
                style={{ textDecoration: "none" }}
              >
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
              <Link
                to={`${otherUserId ? "/profile" : "/following"}`}
                style={{ textDecoration: "none" }}
              >
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
          {otherUserId && userDetails && (
            <button className="followBtn" onClick={handleFollow}>
              <h4 style={{ color: "white" }}>
                {userDetails.is_followed ? "Following" : "Follow"}
              </h4>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
