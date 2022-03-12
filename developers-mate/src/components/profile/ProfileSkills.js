import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  usePostRequestMutation,
  useDeleteRequestMutation,
} from "../../redux/PrivateApi";
import AddButton from "../AddButton";

function ProfileSkills() {
  const userDetails = useSelector((state) => state.userDetails.value);
  const [deleteSkill, responseInfo] = useDeleteRequestMutation();
  const [isGreaterThanThree, setIsGreaterThanThree] = useState(false);

  const handleDelete = async (id) => {
    deleteSkill(`profile/skill/${id}`)
      .unwrap()
      .then((payload) => {
        console.log(payload);
      });
  };
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
      {userDetails && userDetails.skills.length <= 0 && (
        <AddButton to="/profile/addskills/" />
      )}
      <div
        className={`skills ${isGreaterThanThree ? "showSkills" : "hideSkills"}`}
      >
        {userDetails &&
          userDetails.skills.map((item, idx) => {
            return (
              <div className="skill" key={`skills${idx}`}>
                <h3>{item.skill}</h3>
                <MdDelete
                  color="white"
                  size={28}
                  style={{ cursor: "pointer" }}
                  className="icon"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            );
          })}
      </div>
      {userDetails && userDetails.skills.length > 3 && (
        <div className="showMoreArrow">
          {isGreaterThanThree ? (
            <AiOutlineUp
              style={{ cursor: "pointer" }}
              color="white"
              size={25}
              onClick={() => {
                setIsGreaterThanThree(isGreaterThanThree ? false : true);
              }}
            />
          ) : (
            <AiOutlineDown
              style={{ cursor: "pointer" }}
              color="white"
              size={25}
              onClick={() => {
                setIsGreaterThanThree(isGreaterThanThree ? false : true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileSkills;
