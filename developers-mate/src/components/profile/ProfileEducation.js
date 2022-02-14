import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdPhotoCamera } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

function ProfileEducation() {
  return (
    <div className="educationContainer experienceContainer commonBox">
      <div className="head">
        <h1>Education</h1>
        <div className="editAddContainer">
          <Link to="/profile/addeducation">
            <IoMdAdd
              color="white"
              size={28}
              style={{ cursor: "pointer" }}
              className="icon"
            />
          </Link>
        </div>
      </div>
      <div className="educationSection experienceSection">
        <div className="educatione experience">
          <div
            className="logoCollege logoCompany"
            style={{ cursor: "pointer" }}
          >
            <MdPhotoCamera size={24} color="white" className="icon" />
            {/* <img src={profilePic} alt={} /> */}
          </div>
          <div className="collegeDetails companyDetails">
              <div className="details">
                <h2>Manipal University Jaipur</h2>
                <h3 style={{ fontWeight: "400" }}>
                  Bachelors of Technology (Computer Science)
                </h3>
                <h3
                  style={{
                    fontWeight: "200",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  Jan 2022 - Present
                </h3>
              </div>
              <div className="projectIcons">
                <Link to="/profile/editeducation">
                  <BiEdit
                    color="white"
                    size={28}
                    style={{ cursor: "pointer" }}
                    className="icon"
                  />
                </Link>
                <MdDelete size={28} color="white" className="icon" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEducation;
