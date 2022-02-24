import React from "react";
import { BiEdit } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDetails from "../../redux/UserDetails";

function ProfileProject() {
  const userDetails = useSelector((state) => state.userDetails.value);
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
        {userDetails &&
          userDetails.projects.map((item,idx) => {
            return (

            <div className="project" key={`{project${idx}}`}>
              <div className="projectHead">
                <h3>{item.project_name}</h3>
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
                  />
                </div>
              </div>
              <h5 style={{ fontWeight: "400", color: "#E5E5E5" }}>
                {`${item.start_date} - ${item.end_date}`}
              </h5>
              <div className="links">
                <a href={`${item.project_link}`} target="_blank">
                  <button>
                    <h5 style={{ color: "rgb(255, 255, 255)" }}>Project</h5>
                  </button>
                </a>
                {item.live_link!=="" && 
                <a  href={`${item.live_link}`} target="_blank">

                <button>
                  <h5 style={{ color: "rgb(255, 255, 255)" }}>Live</h5>
                </button>
                </a>
                }
              </div>
              <h4>
                {item.description}
              </h4>
            </div>
            );
          })}
      </div>
      
    </div>
  );
}

export default ProfileProject;
