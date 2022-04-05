import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/UserDetails";
import { useDeleteRequestMutation } from "../../redux/PrivateApi";
import WarningPopUp from "../WarningPopUp";
import CoverBackground from "../CoverBackground";
import AddButton from "../AddButton";

function ProfileProject() {
  const userDetails = useSelector((state) => state.userDetails.value);
  const otherUserId = useSelector((state) => state.otherUserId.value);
  const dispatch = useDispatch();
  const [deleteProject] = useDeleteRequestMutation();
  const [displayWarning, setDisplayWarning] = useState(false);
  const [isProjectDeleted, setIsProjectDeleted] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleDelete = async () => {
    deleteProject(`/profile/project/${selectedId}`).then(() => {
      const newArr = userDetails.projects.filter(
        (item) => item.id != selectedId
      );
      dispatch(
        setUserDetails({
          ...userDetails,
          projects: newArr,
        })
      );
    });
  };
  useEffect(() => {
    if (isProjectDeleted) {
      handleDelete();
      setIsProjectDeleted(false);
    }
  }, [isProjectDeleted]);

  return (
    <>
      {displayWarning && <CoverBackground />}
      <WarningPopUp
        display={displayWarning}
        setDisplayWarning={setDisplayWarning}
        setIsDeleted={setIsProjectDeleted}
        heading={"Education"}
      />
      <div className="projectContainer commonBox">
        <div className="head">
          <h1>Projects</h1>
          {!otherUserId && (
            <div className="editAddContainer">
              <Link to="/profile/addproject">
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
        {userDetails && userDetails.projects.length <= 0 && !otherUserId && (
          <AddButton to="/profile/addproject/" />
        )}
        <div className="projects">
          {userDetails &&
            userDetails.projects.map((item, idx) => {
              return (
                <div className="project" key={`{project${idx}}`}>
                  <div className="projectHead">
                    <h2>{item.project_name}</h2>
                    {!otherUserId && (
                      <div className="projectIcons">
                        <Link to={`/profile/editproject/${item.id}`}>
                          <BiEdit
                            color="white"
                            size={28}
                            style={{ cursor: "pointer" }}
                            className="icon"
                          />
                        </Link>
                        <MdDelete
                          color="white"
                          size={28}
                          style={{ cursor: "pointer" }}
                          className="icon"
                          onClick={() => {
                            setDisplayWarning(true);
                            setSelectedId(item.id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <h5 style={{ fontWeight: "400", color: "#E5E5E5" }}>
                    {`${item.start_date} - ${item.end_date}`}
                  </h5>
                  <div className="links">
                    {item.project_link && (
                      <a href={`${item.project_link}`} target="_blank">
                        <button>
                          <h5 style={{ color: "rgb(255, 255, 255)" }}>
                            Project
                          </h5>
                        </button>
                      </a>
                    )}

                    {item.live_link && (
                      <a href={`${item.live_link}`} target="_blank">
                        <button>
                          <h5 style={{ color: "rgb(255, 255, 255)" }}>Live</h5>
                        </button>
                      </a>
                    )}
                  </div>
                  <h4>{item.description}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ProfileProject;
