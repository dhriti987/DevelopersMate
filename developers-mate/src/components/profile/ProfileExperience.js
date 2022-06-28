import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdPhotoCamera } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import WarningPopUp from "../WarningPopUp";
import CoverBackground from "../CoverBackground";
import { useDeleteRequestMutation } from "../../redux/PrivateApi";
import { setUserDetails } from "../../redux/UserDetails";
import AddButton from "../AddButton";

function ProfileExperience() {
  const userDetails = useSelector((state) => state.userDetails.value);
  const otherUserId = useSelector((state) => state.otherUserId.value);
  const [deleteExperience] = useDeleteRequestMutation();
  const [displayWarning, setDisplayWarning] = useState(false);
  const [isExperienceDeleted, setIsExperienceDeleted] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async () => {
    deleteExperience(`/profile/experience/${selectedId}`).then(() => {
      const newArr = userDetails.experiences.filter(
        (item) => item.id != selectedId
      );
      dispatch(
        setUserDetails({
          ...userDetails,
          experiences: newArr,
        })
      );
    });
  };
  useEffect(() => {
    if (isExperienceDeleted) {
      handleDelete();
      setIsExperienceDeleted(false);
    }
  }, [isExperienceDeleted]);
  return (
    <>
      {displayWarning && <CoverBackground />}
      <WarningPopUp
        display={displayWarning}
        setDisplayWarning={setDisplayWarning}
        setIsDeleted={setIsExperienceDeleted}
        heading={"Experience"}
      />
      {!otherUserId || (userDetails && userDetails.experiences.length > 0) ? (
        <div className="experienceContainer commonBox">
          <div className="head">
            <h1>Experience</h1>
            {!otherUserId && (
              <div className="editAddContainer">
                <Link to="/profile/addexperience">
                  <IoMdAdd
                    color="white"
                    size={28}
                    style={{ cursor: "pointer" }}
                    className="icon"
                  />
                </Link>
              </div>
            )}
          </div>
          {userDetails &&
            userDetails.experiences.length <= 0 &&
            !otherUserId && <AddButton to="/profile/addexperience/" />}
          <div className="experienceSection">
            {userDetails &&
              userDetails.experiences.map((item, idx) => {
                return (
                  <div className="experience" key={`exp${idx}`}>
                    <div className="logoCompany" style={{ cursor: "pointer" }}>
                      <MdPhotoCamera size={24} color="white" className="icon" />
                      {/* <img src={profilePic} alt={} /> */}
                    </div>
                    <div className="companyDetails">
                      <div className="details">
                        <h2>{item.title}</h2>
                        <h3 style={{ fontWeight: "500" }}>
                          {item.company_name}
                        </h3>
                        <h3 style={{ fontWeight: "400" }}>
                          {item.employment_type}
                        </h3>
                        <h4
                          style={{
                            fontWeight: "200",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          {`${item.start_date} - ${item.end_date}`}
                        </h4>
                        <h4 style={{ fontWeight: "normal" }}>
                          {item.description}
                        </h4>
                      </div>
                      {!otherUserId && (
                        <div className="projectIcons">
                          <Link to={`/profile/editexperience/${item.id}`}>
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
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : <></>}
    </>
  );
}

export default ProfileExperience;
