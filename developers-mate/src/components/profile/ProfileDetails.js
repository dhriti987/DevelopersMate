import React, { useEffect } from "react";
import { MdInsertPhoto } from "react-icons/md";
import profilePic from "../../assets/profile/profile.svg";
import bannerBg from "../../assets/profile/bannerBg.jpg";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGetRequestMutation } from "../../redux/PrivateApi";


function ProfileDetails() {
  let formData = new FormData();
  const [profileDetails, responseInfo] = useGetRequestMutation();
  useEffect(() => {
    profileDetails("profile/profile/");
  }, []);
  console.log(
    responseInfo.status === "fulfilled" ? responseInfo.data.banner : ""
  );
  const handleChange = async (e) => {
    formData.append("user", localStorage.getItem("userId"));
    formData.append(`${e.target.name}`, e.target.files[0]);

    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/profile/profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="profileDetails">
      <div className="banner">
        {responseInfo.status === "fulfilled" && responseInfo.data["banner"] ? (
          <img
            src={`http://127.0.0.1:8000${responseInfo.data.banner}`}
            alt=""
          />
        ) : (
          <button className="addBannerBtn">
            <MdInsertPhoto size={24} className="icon" />
            <h4 style={{ color: "black", margin: "0" }}>Add Banner</h4>
            <input
              type="file"
              accept="image/*"
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
        {/* {responseInfo.status === "fulfilled" && responseInfo.data["image"] ? 
           <img src={`http://127.0.0.1:8000${responseInfo.data.image}`} alt="" />  
           :  */}

        <button className="addProfilePicBtn">
          <MdInsertPhoto size={24} />
          <h4 style={{ color: "black", margin: "0" }}>Add Profile</h4>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </button>
        {/* } */}
      </div>
      <Link to="/profile/editintro" style={{ textDecoration: "none" }}>
        <BiEdit color="white" className="editbtn icon" size={24} />
      </Link>
      <div className="userProfileDetails">
        <h2>Nitin Rajesh</h2>
        <h4 style={{ fontWeight: "500" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          inventore iure maiores totam, illo optio nostrum blandi
        </h4>
      </div>
    </div>
  );
}

export default ProfileDetails;
