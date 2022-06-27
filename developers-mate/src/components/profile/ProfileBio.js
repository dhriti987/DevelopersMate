import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddButton from "../AddButton";

function ProfileBio() {
  const userDetails = useSelector((state) => state.userDetails.value);
  const otherUserId = useSelector((state) => state.otherUserId.value);
  return (
    <>
      {!otherUserId || (userDetails && userDetails.bio.length > 0) ? (
        <div className="bioContainer commonBox">
          <div className="head">
            <h1>Bio</h1>
            {!otherUserId && (
              <div className="editAddContainer">
                {userDetails && userDetails.bio.length > 0 && (
                  <Link to="/profile/editbio">
                    <BiEdit
                      color="white"
                      size={28}
                      style={{ cursor: "pointer" }}
                      className="icon"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
          {userDetails && userDetails.bio.length <= 0 && !otherUserId && (
            <AddButton to="/profile/addbio/" />
          )}
          <div className="bioSection">
            {userDetails && <h4>{userDetails.bio}</h4>}
          </div>
          {userDetails && userDetails.bio.length >= 800 && (
            <div className="showMoreArrow" style={{ margin: "0 auto" }}>
              <AiOutlineDown
                style={{ cursor: "pointer" }}
                color="white"
                size={25}
              />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProfileBio;
