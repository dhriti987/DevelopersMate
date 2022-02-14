import { React, useState } from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { MdInsertPhoto } from "react-icons/md";

function AddInto() {
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const isAdd = window.location.href.includes("add");
  return (
    <main className="popUp-container">
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>
        {isAdd ? "Add" : "Edit"} Introduction
      </h1>
      <form className={`add-container`}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
        />
        <button className="editImgBtn">
          <MdInsertPhoto size={24} className="icon" />
          <h4 style={{ color: "aliceblue", marginTop: "0.5rem" }}>Edit Banner Image</h4>
          <input type="file" style={{ opacity: "0" }} />
        </button>
        <button className="editImgBtn">
          <MdInsertPhoto size={24} className="icon" />
          <h4 style={{ color: "aliceblue", marginTop: "0.5rem" }}>Edit Profile Image</h4>
          <input type="file" style={{ opacity: "0" }}/>
        </button>
        <div className="nextBtn-container nextBtnEdu">
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <button className="nextbtn">
              <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default AddInto;
