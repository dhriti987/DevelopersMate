import { React, useState, useEffect } from "react";
import "../../style/profile/AddSkills.css";
import { AiOutlinePlus } from "react-icons/ai";
import { skillsArray } from "../../data/SkillsData";
import { AiFillDelete } from "react-icons/ai";
import { BiRightArrowCircle } from 'react-icons/bi';
import { Link } from "react-router-dom";

function AddSkills() {
  const [searchInput, setSearchInput] = useState("");
  const [displayOptions, setDisplayOptions] = useState(false);
  const [dummySkillsArray, setDummySkillsArray] = useState(skillsArray);
  const [selectedSkillsArr, setSelectedSkillsArr] = useState([]);

  useEffect(() => {
    const newArray = skillsArray.filter((item) =>
      item.toLowerCase().includes(searchInput.toLowerCase())
    );
    setDummySkillsArray(newArray);
  }, [searchInput]);

  const handleOptionsAdd = (e) => {
    if (e === null) {
      setSelectedSkillsArr([...selectedSkillsArr, searchInput]);
      setSearchInput("");
    } else {
      setSelectedSkillsArr([...selectedSkillsArr, e.target.textContent]);
      setDummySkillsArray(
        dummySkillsArray.filter((item) => item !== e.target.textContent)
      );
    }
    setDisplayOptions(false);
  };

  const handleDeleteSkills = (idx) => {
    const deleted = selectedSkillsArr[idx];
    const newArray = [...selectedSkillsArr];
    newArray.splice(idx, 1);
    setSelectedSkillsArr(newArray);
    setDummySkillsArray([...dummySkillsArray, deleted]);
  };
  return (
    <main className="popUp-container">
      <h1 style={{ textAlign: "center" }}>Add Skills</h1>
      <div
      style={{display:"flex",flexDirection:"row",gap:"0"}}
        className={`form ${
          displayOptions ? "noBorders" : "keepBorders"
        }`}
      >
        <input
          type="text"
          placeholder="Search your Skills"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onClick={() => {
            setDisplayOptions(displayOptions ? false : true);
          }}
        />
        <div
          className={`addSkill ${
            displayOptions ? "noBordersAddSkill" : "keepBordersAddSkill"
          }`}
        >
          <AiOutlinePlus
            className="addSkillIcon"
            color="white"
            size={40}
            onClick={() => handleOptionsAdd(null)}
          />
        </div>
      {displayOptions && (
        
          <div
            className={`dropDown  ${
              dummySkillsArray.length <= 4
                ? "optionsHeightLess"
                : "optionsHeightFull"
            }`}
            id="options"
            
          >
            {dummySkillsArray.map((item, idx) => {
              return (
                <div key={`Skills${idx}`} onClick={(e) => handleOptionsAdd(e)}>
                  <h4>{item}</h4>
                </div>
              );
            })}
          
        </div>
      )}
      </div>
      <div className="skillsContainer">
        {selectedSkillsArr.map((item, idx) => {
          return (
            <div className="skills" key={`addedSkills${idx}`}>
              <h4>{item}</h4>
              <AiFillDelete
                className="skillsDeleteIcon"
                style={{ cursor: "pointer" }}
                color="white"
                size={25}
                onClick={() => {
                  handleDeleteSkills(idx);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="nextBtn-container">
        <Link to="/home/addeducation" style={{textDecoration:"none"}}>
          <button className="nextbtn">
            <h4 style={{ margin: "0" }}>Next</h4>
            <BiRightArrowCircle size={23}/>
          </button>
        </Link>
      </div>
    </main>
  );
}

export default AddSkills;
