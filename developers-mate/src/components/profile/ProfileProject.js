import React from "react";
import { BiEdit } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

function ProfileProject() {

  const userDetails = useSelector((state)=>state.userDetails.value);
  console.log(userDetails)
  return (
    <div className="projectContainer commonBox">
      <div className="head">
        <h1>Projects</h1>
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
      </div>
      <div className="projects">
        {/* {userDetails && 
          userDetails.
        } */}
        <div className="project">
          <div className="projectHead">
            <h3>Quiz Portal</h3>
            <div className="projectIcons">
              <Link to="/profile/editproject">
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
              />
            </div>
          </div>
          <h5 style={{ fontWeight: "400", color: "#E5E5E5" }}>
            12 Dec 2020 - 12 Jan 2021
          </h5>
          <div className="links">
            <button>
              <h5 style={{ color: "rgb(255, 255, 255)" }}>Project</h5>
            </button>
            <button>
              <h5 style={{ color: "rgb(255, 255, 255)" }}>Live</h5>
            </button>
          </div>
          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed beatae
            officia sit ipsum praesentium nemo dolorem eligendi velit aperiam
            accusamus. Quam expedita ex repellendus suscipit aut dolores itaque
            placeat ducimus.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ProfileProject;
