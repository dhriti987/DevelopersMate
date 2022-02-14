import React from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDown } from "react-icons/ai";
import {Link} from "react-router-dom";

function ProfileSkills() {
  return (
    <div className="skillsContainer commonBox">
      <div className="head">
        <h1>Skills</h1>
        <div className="editAddContainer">
          <Link to="/profile/addskills">
            <IoMdAdd
              color="white"
              size={28}
              style={{ cursor: "pointer" }}
              className="icon"
            />
          </Link>
        </div>
      </div>
      <div className="skills">
        <div className="skill">
          <h3>React</h3>
          <MdDelete
            color="white"
            size={28}
            style={{ cursor: "pointer" }}
            className="icon"
          />
        </div>
        <div className="skill">
          <h3>JavasScript</h3>
          <MdDelete
            color="white"
            size={28}
            style={{ cursor: "pointer" }}
            className="icon"
          />
        </div>
        <div className="skill">
          <h3>Python</h3>
          <MdDelete
            color="white"
            size={28}
            style={{ cursor: "pointer" }}
            className="icon"
          />
        </div>
      </div>
      <div className="showMoreArrow">
        <AiOutlineDown style={{ cursor: "pointer" }} color="white" size={25} />
      </div>
    </div>
  );
}

export default ProfileSkills;
