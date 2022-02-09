import { React, useState, useEffect } from "react";
import "../../style/profile/AddExperience.css";
import { BiChevronDown, BiChevronUp ,BiRightArrowCircle} from "react-icons/bi";
import { employmentArr } from "../../data/EmploymentData";
import { months } from "../../data/MonthData";
import { yearsArray } from "../../data/YearsData";
import CustomizedCheckBox from "../CustomizedCheckBox";
import {Link} from "react-router-dom";

function AddExperience() {
  const [displayEmploymenyOptions, setDisplayEmploymenyOptions] =
    useState(false);
  const [employmentInput, setemploymentInput] = useState("");
  const [displayDateOption, setDisplayDateOption] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [dateClicked, setDateClicked] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const handleClickDate = (e, idx) => {
    //   dateClicked[idx]=e.target.textContent;
    const z = {};
    z[idx] = e.target.textContent;
    setDateClicked({
      ...dateClicked,
      ...z,
    });
    console.log(dateClicked);
  };

  return (
    <main className="popUp-container">
      <h1 style={{ textAlign: "center" }}>Add Experience</h1>
      {/* <BsInfoCircle color='white'/> */}

      <form className="form">
        <input
          type="text"
          className="experienceInput"
          placeholder="Title (ex.Software Developer)"
        />
        <input
          type="text"
          className="experienceInput"
          placeholder="Company Name"
        />
        <div className="employment-contianer">
          <div
            className="employment"
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
            />
            {displayEmploymenyOptions ? (
              <BiChevronUp size={27} color="white" />
            ) : (
              <BiChevronDown size={27} color="white" />
            )}
          </div>
          <div
            className={`dropDown ${
              displayEmploymenyOptions
                ? "displayEmploymentOptions"
                : "hideEmploymentOptions"
            }`}
          >
            {employmentArr.map((item, idx) => {
              return (
                <h4
                  key={`employ${idx}`}
                  onClick={(e) => {
                    setemploymentInput(e.target.textContent);
                    setDisplayEmploymenyOptions(false);
                  }}
                >
                  {item}
                </h4>
              );
            })}
          </div>
        </div>
        <CustomizedCheckBox setIsChecked={setIsChecked} isChecked={isChecked} />
        <div className="datesContainer">
          <div className="dates">
            <div
              className="start-container"
              onClick={() => {
                setDisplayDateOption(displayDateOption == 1 ? 0 : 1);
              }}
            >
              <input
                type="text"
                placeholder="Start Month"
                defaultValue={dateClicked[1]}
              />
              <BiChevronDown size={27} color="white" className="datesIcon" />
            </div>
            <div
              className="start-container"
              onClick={() => {
                setDisplayDateOption(displayDateOption == 2 ? 0 : 2);
              }}
            >
              <input
                type="text"
                placeholder="Start Year"
                defaultValue={dateClicked[2]}
              />
              <BiChevronDown size={27} color="white" className="datesIcon" />
            </div>
          </div>
          <div className="datesDropDown">
            <div
              className={`left ${
                displayDateOption == 1 ? "displayDates" : "hideDates"
              }`}
            >
              {months.map((item, idx) => {
                return (
                  <h4
                    key={`month${idx}`}
                    onClick={(e) => {
                      setDisplayDateOption(0);
                      handleClickDate(e, 1);
                    }}
                  >
                    {item}
                  </h4>
                );
              })}
            </div>

            <div
              className={`right ${
                displayDateOption == 2 ? "displayDates" : "hideDates"
              }`}
            >
              {yearsArray.map((item, idx) => {
                return (
                  <h4
                    key={`month${idx}`}
                    onClick={(e) => {
                      setDisplayDateOption(0);
                      handleClickDate(e, 2);
                    }}
                  >
                    {item}
                  </h4>
                );
              })}
            </div>
          </div>
        </div>

        {isChecked && (
          <div className="datesContainer">
            <div className="dates">
              <div
                className="start-container"
                onClick={() => {
                  setDisplayDateOption(displayDateOption == 3 ? 0 : 3);
                }}
              >
                <input
                  type="text"
                  placeholder="End Month"
                  defaultValue={dateClicked[3]}
                />
                <BiChevronDown size={27} color="white" className="datesIcon" />
              </div>
              <div
                className="start-container"
                onClick={() => {
                  setDisplayDateOption(displayDateOption == 4 ? 0 : 4);
                }}
              >
                <input
                  type="text"
                  placeholder="End Year"
                  defaultValue={dateClicked[4]}
                />
                <BiChevronDown size={27} color="white" className="datesIcon" />
              </div>
            </div>
            <div className="datesDropDown">
              <div
                className={`left ${
                  displayDateOption == 3 ? "displayDates" : "hideDates"
                }`}
              >
                {months.map((item, idx) => {
                  return (
                    <h4
                      key={`month${idx}`}
                      onClick={(e) => {
                        setDisplayDateOption(0);
                        handleClickDate(e, 3);
                      }}
                    >
                      {item}
                    </h4>
                  );
                })}
              </div>

              <div
                className={`right ${
                  displayDateOption == 4 ? "displayDates" : "hideDates"
                }`}
              >
                {yearsArray.map((item, idx) => {
                  return (
                    <h4
                      key={`month${idx}`}
                      onClick={(e) => {
                        setDisplayDateOption(0);
                        handleClickDate(e, 4);
                      }}
                    >
                      {item}
                    </h4>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="nextBtn-container nextBtnUserDetails">
        <Link to="/home/addeducation" style={{textDecoration:"none"}}>
          <button className="nextbtn">
            <h4 style={{ margin: "0" }}>Submit</h4>
            <BiRightArrowCircle size={23}/>
          </button>
        </Link>
      </div>
      </form>
    </main>
  );
}

export default AddExperience;
