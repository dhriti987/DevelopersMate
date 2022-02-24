import axios from "axios";
import { useState, React } from "react";
import "../../style/profile/CommonAdd.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import DoubleDropDown from "../DoubleDropDown";
import { yearsArray } from "../../data/YearsData";

function AddEducation() {
  const [title, setTitle] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState(["", ""]);
  const [display, setDisplay] = useState([false, false]);
  const isAdd = window.location.href.includes("add");

  return (
    <main className="popUp-container" style={{ justifyContent: "inherit" }}>
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>
        {isAdd ? "Add" : "Edit"} Education
      </h1>
      <form className={`add-container`}>
        <input
          type="text"
          placeholder="College Name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Degree"
          value={degree}
          onChange={(e) => {
            setDegree(e.target.value);
          }}
        />
        <div className="DownDouble-container">
          <div className="downDouble">
            <div className="inputContainer">
              <input
                type="text"
                defaultValue={year[0]}
                placeholder="Start Year"
                className="input"
                onClick={() => {
                  setDisplay(display[0] ? [false, false] : [true, false]);
                }}
              />
              {display[0] ? (
                <BsChevronUp color="white" />
              ) : (
                <BsChevronDown color="white" />
              )}
            </div>
            <div className="inputContainer">
              <input
                type="text"
                defaultValue={year[1]}
                placeholder="End Year"
                className="input"
                onClick={() => {
                  setDisplay(display[1] ? [false, false] : [false, true]);
                }}
              />
              {display[1] ? (
                <BsChevronUp color="white" />
              ) : (
                <BsChevronDown color="white" />
              )}
            </div>
          </div>
          <DoubleDropDown
            top={"14rem"}
            arr1={yearsArray}
            arr2={yearsArray}
            display={display}
            setDisplay={setDisplay}
            input={year}
            setInput={setYear}
          />
        </div>
        <div className="nextBtn-container nextBtnEdu">
            <button className="nextbtn">
              <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
            </button>
        </div>
      </form>
    </main>
  );
}

export default AddEducation;
