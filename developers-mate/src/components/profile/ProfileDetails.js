import React, { useEffect, useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useGetRequestMutation } from "../../redux/PrivateApi";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/UserDetails";
import api from "../../api/ImageApi";
import { BiPencil } from "react-icons/bi";

function ProfileDetails() {
  let formData = new FormData();
  const userDetails = useSelector((state) => state.userDetails.value);
  const otherUserId = useSelector((state)=>state.otherUserId.value)
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
  return (
    <div className="profileDetails">
      <div className="banner">
        {userDetails && userDetails.banner && !otherUserId ? (
          <>
          <Link to="/profile/editbanner">
              <BiPencil
                color="white"
                size={28}
                style={{ cursor: "pointer",position:"absolute",right:"0.5rem",top:"0.5rem" }}
                className="icon"
              />
            </Link>
          <img src={`http://127.0.0.1:8000${userDetails.banner}`} alt="" />
          </>
        ) : (
          !otherUserId && 
          (<button className="addBannerBtn">
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
          </button>)
        )}
      </div>
      <div className="profileImage">
        {userDetails && userDetails.image !== "/media/user/default.jpg" ? (
          <img src={`http://127.0.0.1:8000${userDetails.image}`} alt="" />
        ) : (
          
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
          )
        )}
      </div>
      {!otherUserId && 
      <Link to="/profile/editintro" style={{ textDecoration: "none" }}>
        <BiEdit color="white" className="editbtn icon" size={24} />
      </Link>
      }
      <div className="userProfileDetails">
        <h2>
          {userDetails && `${userDetails.first_name} ${userDetails.last_name}`}
        </h2>
        <h4 style={{ fontWeight: "500" }}>
          {userDetails && userDetails.headline}
        </h4>
      </div>
    </div>
  );
}

export default ProfileDetails;
