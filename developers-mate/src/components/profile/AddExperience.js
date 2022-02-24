import { React, useState, useEffect } from "react";
import "../../style/profile/CommonAdd.css";
import { BiChevronDown, BiChevronUp, BiRightArrowCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { employmentArr } from "../../data/EmploymentData";
import CustomizedCheckBox from "../CustomizedCheckBox";
import { Link } from "react-router-dom";
import DoubleDropDown from "../DoubleDropDown";
import SingleDropDown from "../SingleDropDown";
import { yearsArray } from "../../data/YearsData";
import { months } from "../../data/MonthData";

function AddExperience() {
  const [displayEmploymenyOptions, setDisplayEmploymenyOptions] =
    useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [employmentInput, setEmploymentInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const isAdd = window.location.href.includes("add");
  const [startDate, setStartDate] = useState(["", ""]);
  const [endDate, setEndDate] = useState(["", ""]);
  const [display1, setDisplay1] = useState([false, false]);
  const [display2, setDisplay2] = useState([false, false]);

  const handleSubmit=async()=>{

  }

  return (
    <main className="popUp-container">
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>
        {isAdd ? "Add" : "Edit"} Experience
      </h1>

      {/* <BsInfoCircle color='white'/> */}

      <form className="add-container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="Input"
          placeholder="Title (ex.Software Developer)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="Input"
          placeholder="Company Name"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        <div className="DownSingle-contianer">
          <div
            className="inputContainer"
            onClick={() => {
              setDisplayEmploymenyOptions(
                displayEmploymenyOptions ? false : true
              );
            }}
          >
            <input
              type="text"
              placeholder="Employment"
              defaultValue={employmentInput}
              className="input"
            />
            {displayEmploymenyOptions ? (
              <BiChevronUp size={27} color="white" className="inputIcon" />
            ) : (
              <BiChevronDown size={27} color="white" className="inputIcon" />
            )}
          </div>
          <SingleDropDown
            arr={employmentArr}
            setInput={setEmploymentInput}
            displayOptions={displayEmploymenyOptions}
            setDisplayOptions={setDisplayEmploymenyOptions}
          />
        </div>
        <CustomizedCheckBox
          title="I am Currently Working in this role."
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
        <div className="DownDouble-container">
          <div className="downDouble">
            <div
              className="inputContainer"
              onClick={() => {
                setDisplay1(display1[0] ? [false, false] : [true, false]);
              }}
            >
              <input
                type="text"
                placeholder="Start Month"
                defaultValue={startDate[0]}
                className="input"
              />
              <BiChevronDown size={27} color="white" className="inputIcon" />
            </div>
            <div
              className="inputContainer"
              onClick={() => {
                setDisplay1(display1[1] ? [false, false] : [false, true]);
              }}
            >
              <input
                type="text"
                placeholder="Start Year"
                defaultValue={startDate[1]}
                className="input"
              />
              <BiChevronDown size={27} color="white" className="inputIcon" />
            </div>
          </div>
          <DoubleDropDown
            arr1={months}
            arr2={yearsArray}
            display={display1}
            setDisplay={setDisplay1}
            input={startDate}
            setInput={setStartDate}
          />
        </div>

        {!isChecked && (
          <div className="DownDouble-container">
            <div className="downDouble">
              <div
                className="inputContainer"
                onClick={() => {
                  setDisplay2(display2[0] ? [false, false] : [true, false]);
                }}
              >
                <input
                  type="text"
                  placeholder="End Month"
                  defaultValue={endDate[0]}
                  className="input"
                />
                <BiChevronDown size={27} color="white" />
              </div>
              <div
                className="inputContainer"
                onClick={() => {
                  setDisplay2(display2[1] ? [false, false] : [false, true]);
                }}
              >
                <input
                  type="text"
                  placeholder="End Year"
                  defaultValue={endDate[1]}
                  className="input"
                />
                <BiChevronDown size={27} color="white" />
              </div>
            </div>

            <DoubleDropDown
              arr1={months}
              arr2={yearsArray}
              display={display2}
              setDisplay={setDisplay2}
              input={endDate}
              setInput={setEndDate}
            />
          </div>
        )}
        <div className="nextBtn-container nextBtnUserDetails">
          <button className="nextbtn" type="submit">
            <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddExperience;
