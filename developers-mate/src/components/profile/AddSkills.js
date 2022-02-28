import { React, useState, useEffect } from "react";
import "../../style/profile/AddSkills.css";
import { AiOutlinePlus } from "react-icons/ai";
import { skillsArray } from "../../data/SkillsData";
import { AiFillDelete } from "react-icons/ai";
import { BiRightArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import SingleDropDown from "../SingleDropDown";
import { useSelector,useDispatch } from "react-redux";
import {usePostRequestMutation} from "../../redux/PrivateApi";
import {setUserDetails} from "../../redux/UserDetails";
import ErrorPopUp from "../ErrorPopUp";
import CoverBackground from "../CoverBackground";

function AddSkills() {
  const userDetails = useSelector((state)=>state.userDetails.value);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [displayOptions, setDisplayOptions] = useState(false);
  const [dummySkillsArray, setDummySkillsArray] = useState(skillsArray);
  const [selectedSkillsArr, setSelectedSkillsArr] = useState([]);
  const isProfile=window.location.href.includes("profile");
  const [input,setInput]=useState('');
  const [addSkills,responseInfo] = usePostRequestMutation();
  const [showError,setShowError] = useState(false);

  useEffect(() => {
    const newArray = skillsArray.filter((item) =>
      item.toLowerCase().includes(searchInput.toLowerCase())
    );
    setDummySkillsArray(newArray);
  }, [searchInput]);

  const checkAlreadyPresent=(val)=>{
    for(let i=0;i<userDetails.skills.length;i++){
      if(userDetails.skills[i].skill.toLowerCase() === val.toLowerCase()) return true;
    }
    return false;
  }

  const handleOptionsAdd = (e) => {
    if (e === null) {
      if(checkAlreadyPresent(searchInput)){
        setShowError(true) 
        setTimeout(()=>{
          setShowError(false)
        },3000)
        return
      }
      setSelectedSkillsArr([...selectedSkillsArr, searchInput]);
      handleSubmit(searchInput)

      setSearchInput("");
    } else {
      if(checkAlreadyPresent(e.target.textContent)){
        setShowError(true) 
        setTimeout(()=>{
          setShowError(false)
        },3000)
        return
      }
      setSelectedSkillsArr([...selectedSkillsArr, e.target.textContent]);
      handleSubmit(e.target.textContent)
    }
    setDisplayOptions(false);
  };

  

  const handleSubmit=async(skill)=>{
    const data={
      skill:skill
    }
    // console.log(data)
    await addSkills({data:data,url:"profile/skill/"})
    .unwrap()
    .then((payload)=>{
      const x=userDetails.skills
      dispatch(setUserDetails({
        ...userDetails,
        skills:[...x,payload]
      }))
    })
  }
  return (
    <>
    <CoverBackground/>
    <main className="popUp-container">
    <ErrorPopUp error="Oops! You have Already added this Skill." display={showError ? `show` : `hide`}/>
      {isProfile && (
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <ImCross size={23} color="white" className="cancelIcon" />
        </Link>
      )}
      <h1 style={{ textAlign: "center" }}>Add Skills</h1>
      <div
        style={{ display: "flex", flexDirection: "row", gap: "0" }}
        className={`form ${displayOptions ? "noBorders" : "keepBorders"}`}
      >
        <input
          type="text"
          placeholder="Search your Skills"
          className="addSkillsInput"
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

          <SingleDropDown
          top="7.8rem"
            arr={dummySkillsArray}
            anyfuntion={handleOptionsAdd}
            displayOptions={displayOptions}
            setInput={setInput}
            setDisplayOptions={setDisplayOptions}
          />
        )}
      </div>
      <div className="skillsContainer">
        {selectedSkillsArr.map((item, idx) => {
          return (
            <div className="skills" key={`addedSkills${idx}`}>
              <h4>{item}</h4>
              
            </div>
          );
        })}
      </div>
      <div className="nextBtn-container">
        <Link to="/profile" style={{textDecoration:"none"}}>
          <button className="nextbtn" onClick={handleSubmit}>
            <h4 style={{ margin: "0" }}>
              {window.location.href.includes("profile") ? "Done" : "Next"}
            </h4>
            {!window.location.href.includes("profile") && (
              <BiRightArrowCircle size={23} />
            )}
          </button>
        </Link>
      </div>
    </main>
    </>
  );
}

export default AddSkills;
