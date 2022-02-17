import axios from "axios";
import { useState, React } from "react";
import "../../style/profile/CommonAdd.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import DoubleDropDown from "../DoubleDropDown";
import { yearsArray } from "../../data/YearsData";
import { months } from "../../data/MonthData";
import CustomizedCheckBox from "../CustomizedCheckBox";
import { ImCross } from "react-icons/im";

function AddProjects() {
  const [title, setTitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [desciption, setDescription] = useState("");
  const [displayDateOption, setDisplayDateOption] = useState(0);
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [fourthInput, setFourthInput] = useState("");
  const [isCheckedEndDate, setIsCheckedEndDate] = useState(false);
  const [isCheckedDeployed, setIsCheckedDeployed] = useState(false);
  const isAdd=window.location.href.includes("add");

  return (
    <main
      className="popUp-container"
      style={{ height: "40rem", top: "0.4rem" }}
    >
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>{isAdd ? "Add" : "Edit"} Project</h1>
      <form className={`add-container`}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {/* <p style={{color:"red",margin:"0",fontSize:"0.5rem",width:"98%"}}>Enter title</p> */}
        <CustomizedCheckBox
          title="I am Currently Working in this Project."
          setIsChecked={setIsCheckedEndDate}
          isChecked={isCheckedEndDate}
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
              <BsChevronDown size={27} color="white" className="inputIcon" />
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
              <BsChevronDown size={27} color="white" className="inputIcon" />
            </div>
          </div>
          <DoubleDropDown
            top={"13.5rem"}
            arr1={months}
            arr2={yearsArray}
            displayLeft={displayDateOption == 1 ? true : false}
            displayRight={displayDateOption == 2 ? true : false}
            setLeftInput={setFirstInput}
            setRightInput={setSecondInput}
          />
        </div>
        {/* <p style={{color:"red",margin:"0",fontSize:"0.5rem",width:"98%"}}>Enter date</p> */}
        {!isCheckedEndDate && (
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
                <BsChevronDown size={27} color="white" />
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
                <BsChevronDown size={27} color="white" />
              </div>
            </div>

            <DoubleDropDown
              top={"16.7rem"}
              arr1={months}
              arr2={yearsArray}
              displayLeft={displayDateOption == 3 ? true : false}
              displayRight={displayDateOption == 4 ? true : false}
              setLeftInput={setThirdInput}
              setRightInput={setFourthInput}
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Project Link"
          value={projectLink}
          onChange={(e) => {
            setProjectLink(e.target.value);
          }}
        />
        <CustomizedCheckBox
          title="Is this Project Deployed?"
          setIsChecked={setIsCheckedDeployed}
          isChecked={isCheckedDeployed}
        />
        {isCheckedDeployed && (
          <input
            type="text"
            placeholder="Live Link"
            value={liveLink}
            onChange={(e) => {
              setLiveLink(e.target.value);
            }}
          />
        )}
        <textarea
          name="description"
          id="Description"
          rows="8"
          placeholder="Description"
          value={desciption}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      <div className="nextBtn-container nextBtnEdu">
          <button className="nextbtn">
            <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
          </button>
      </div>
      </form>
    </main>
  );
}

export default AddProjects;
