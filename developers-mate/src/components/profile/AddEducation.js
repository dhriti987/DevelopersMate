import axios from "axios";
import { useEffect, useState, React } from "react";
import "../../style/profile/AddEducation.css";
import { yearsArray } from "../../data/YearsData.js";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { BiRightArrowCircle } from "react-icons/bi";
import { ImWarning } from "react-icons/im";
import {Link} from 'react-router-dom';

function AddEducation() {
  const [startYearInput, setStartYearInput] = useState("");
  const [endYearInput, setEndYearInput] = useState("");
  const [displayStartYear, setDisplayStartYear] = useState(false);
  const [displayEndYear, setDisplayEndYear] = useState(false);
  const [haveCollegeDegree,setHaveCollegeDegree]=useState(true);

  const handleDisplayYear=(year)=>{
    if(year==="start") setDisplayStartYear(displayStartYear ? false : true);
    else setDisplayEndYear(displayEndYear ? false : true);
  }

  useEffect(()=>{
    setTimeout(()=>{
      setHaveCollegeDegree(false);
    },3000)
  },[])

  return (
    <main className="popUp-container">
      
      <div className={`noDegreeMessage ${haveCollegeDegree ? "" : "fadedMessage"}`}>
        <ImWarning color="yellow"/>
        <h4>Skip if No college Degree</h4>
      </div>
      
      <h1 style={{ textAlign: "center" }}>Add Education</h1>
      <div className={`collegeName-container`}>
        <input type="text" placeholder="College Name" />
        <input type="text" placeholder="Degree" />
        <div className="years">
          <div className="yearInput" onClick={()=>{handleDisplayYear("start")}}>
            <input
              type="text"
              defaultValue={startYearInput}
              placeholder="Start Year"
              
              />
              {displayStartYear ? <BsChevronUp color="white"/> : <BsChevronDown color="white" />}
            
          </div>
          <div className="yearInput" onClick={()=>{handleDisplayYear("end")}}>
            <input
              type="text"
              defaultValue={endYearInput}
              placeholder="End Year"
              
              />
              {displayEndYear ? <BsChevronUp color="white"/> : <BsChevronDown color="white" />}
            
          </div>
        </div>
      </div>
      <div className="yearOptions-container">
        <div
          className={`startYearOptions ${
            displayStartYear ? "fullStartheight" : "zeroStartHeight"
          }`}
        >
          {yearsArray.map((item, idx) => {
            return (
              <h4
                key={`years${idx}`}
                value={startYearInput}
                onClick={(e) => {
                  setStartYearInput(e.target.textContent);
                  setDisplayStartYear(false)
                }}
              >
                {item}
              </h4>
            );
          })}
        </div>

        <div
          className={`endYearOptions ${
            displayEndYear ? "fullEndheight" : "zeroEndHeight"
          }`}
        >
          {yearsArray.map((item, idx) => {
            return (
              <h4
                key={`years${idx}`}
                onClick={(e) => {
                  setEndYearInput(e.target.textContent);
                  setDisplayEndYear(false)
                }}
              >
                {item}
              </h4>
            );
          })}
        </div>
      </div>
      <div className="nextBtn-container nextBtnEdu">
        <Link to="/home/addeducation" style={{textDecoration:"none"}}>
          <button className="nextbtn">
            <h4 style={{ margin: "0" }}>Submit</h4>
            <BiRightArrowCircle size={23}/>
          </button>
        </Link>
      </div>
    </main>
  );
}

export default AddEducation;
