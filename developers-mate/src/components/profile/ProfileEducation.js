import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdPhotoCamera } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/UserDetails";
import { useDeleteRequestMutation } from "../../redux/PrivateApi";
import WarningPopUp from "../WarningPopUp";
import CoverBackground from "../CoverBackground";
import AddButton from "../AddButton";

function ProfileEducation() {
  const userDetails = useSelector((state) => state.userDetails.value);
  const dispatch = useDispatch();
  const [deleteEducation] = useDeleteRequestMutation();
  const [displayWarning, setDisplayWarning] = useState(false);
  const [isEducationDeleted, setIsEducationDeleted] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleDelete = async () => {
    deleteEducation(`/profile/education/${selectedId}`).then(() => {
      const newArr = userDetails.education.filter(
        (item) => item.id != selectedId
      );
      dispatch(
        setUserDetails({
          ...userDetails,
          education: newArr,
        })
      );
    });
  };
  useEffect(()=>{

    if (isEducationDeleted) {
      handleDelete();
      setIsEducationDeleted(false);
    }
  },[isEducationDeleted])

  return (
    <>
      {displayWarning && <CoverBackground />}
      <WarningPopUp
        display={displayWarning}
        setDisplayWarning={setDisplayWarning}
        setIsDeleted={setIsEducationDeleted}
        heading={"Education"}
      />
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
                {
                  userDetails && userDetails.education.length<=0 && (
                    <AddButton to="/profile/addeducation/"/>
                  )
                }
        <div className="educationSection experienceSection">
          {userDetails &&
            userDetails.education.map((item, idx) => {
              return (
                <div className="education experience" key={`edu${idx}`}>
                  <div
                    className="logoCollege logoCompany"
                    style={{ cursor: "pointer" }}
                  >
                    <MdPhotoCamera size={24} color="white" className="icon" />
                    {/* <img src={profilePic} alt={} /> */}
                  </div>
                  <div className="collegeDetails companyDetails">
                    <div className="details">
                      <h2>{item.college_name}</h2>
                      <h3 style={{ fontWeight: "400" }}>{item.degree}</h3>
                      <h3
                        style={{
                          fontWeight: "200",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {`${item.start_year} - ${item.passing_year}`}
                      </h3>
                    </div>
                    <div className="projectIcons">
                      <Link to={`/profile/editeducation/${item.id}`}>
                        <BiEdit
                          color="white"
                          size={28}
                          style={{ cursor: "pointer" }}
                          className="icon"
                        />
                      </Link>
                      <MdDelete
                        size={28}
                        color="white"
                        className="icon"
                        onClick={() => {
                          setDisplayWarning(true);
                          setSelectedId(item.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      ;
    </>
  );
}

export default ProfileEducation;
