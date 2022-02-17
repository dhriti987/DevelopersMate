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
  const [displayDateOption, setDisplayDateOption] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [fourthInput, setFourthInput] = useState("");
  const isAdd=window.location.href.includes("add"); 

  return (
    <main className="popUp-container">
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>{isAdd ? "Add" : "Edit"} Experience</h1>

      {/* <BsInfoCircle color='white'/> */}

      <form className="add-container">
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
                setDisplayDateOption(displayDateOption == 1 ? 0 : 1);
              }}
            >
              <input
                type="text"
                placeholder="Start Month"
                defaultValue={firstInput}
                className="input"
              />
              <BiChevronDown size={27} color="white" className="inputIcon" />
            </div>
            <div
              className="inputContainer"
              onClick={() => {
                setDisplayDateOption(displayDateOption == 2 ? 0 : 2);
              }}
            >
              <input
                type="text"
                placeholder="Start Year"
                defaultValue={secondInput}
                className="input"
              />
              <BiChevronDown size={27} color="white" className="inputIcon" />
            </div>
          </div>
          <DoubleDropDown
            arr1={months}
            arr2={yearsArray}
            displayLeft={displayDateOption == 1 ? true : false}
            displayRight={displayDateOption == 2 ? true : false}
            setLeftInput={setFirstInput}
            setRightInput={setSecondInput}
          />
        </div>

        {!isChecked && (
          <div className="DownDouble-container">
            <div className="downDouble">
              <div
                className="inputContainer"
                onClick={() => {
                  setDisplayDateOption(displayDateOption == 3 ? 0 : 3);
                }}
              >
                <input
                  type="text"
                  placeholder="End Month"
                  defaultValue={thirdInput}
                  className="input"
                />
                <BiChevronDown size={27} color="white" />
              </div>
              <div
                className="inputContainer"
                onClick={() => {
                  setDisplayDateOption(displayDateOption == 4 ? 0 : 4);
                }}
              >
                <input
                  type="text"
                  placeholder="End Year"
                  defaultValue={fourthInput}
                  className="input"
                />
                <BiChevronDown size={27} color="white" />
              </div>
            </div>

            <DoubleDropDown
              arr1={months}
              arr2={yearsArray}
              displayLeft={displayDateOption == 3 ? true : false}
              displayRight={displayDateOption == 4 ? true : false}
              setLeftInput={setThirdInput}
              setRightInput={setFourthInput}
            />
          </div>
        )}
        <div className="nextBtn-container nextBtnUserDetails">
            <button className="nextbtn">
              <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
            </button>
        </div>
      </form>
    </main>
  );
}

export default AddExperience;
