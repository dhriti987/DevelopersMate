import React from "react";
import "../../style/profile/CommonAdd.css";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

function AddBio() {
  const isAdd=window.location.href.includes("add");
  return (
    <main className="popUp-container">
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>{isAdd ? "Add" : "Edit"} Bio</h1>
      <textarea
        name="bio"
        id="Bio"
        rows="20"
        style={{ padding: "1rem 1rem" }}
      ></textarea>
      <div className="nextBtn-container nextBtnEdu">
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <button className="nextbtn">
            <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
          </button>
        </Link>
      </div>
    </main>
  );
}

export default AddBio;
