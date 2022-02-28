import axios from "axios";
import { useState, React, useEffect } from "react";
import "../../style/profile/CommonAdd.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import DoubleDropDown from "../DoubleDropDown";
import { yearsArray } from "../../data/YearsData";
import { months } from "../../data/MonthData";
import CustomizedCheckBox from "../CustomizedCheckBox";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../redux/UserDetails";
import {
  usePostRequestMutation,
  usePatchRequestMutation,
} from "../../redux/PrivateApi";
import CoverBackground from "../CoverBackground";

function AddProjects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [addProject, responseAddInfo] = usePostRequestMutation();
  const [editProject, responseEditInfo] = usePatchRequestMutation();
  const isAdd = window.location.href.includes("add");
  const userDetails = useSelector((state) => state.userDetails.value);
  useEffect(() => {
    if (userDetails === null || userDetails === undefined) {
      navigate("/profile");
    }
  }, []);
  const projectDetail =
    !isAdd &&
    userDetails &&
    userDetails.projects.filter((item) => item.id == id)[0];
  const [addProjectsObj, setAddProjectsObj] = useState(
    isAdd
      ? {
          title: "",
          projectLink: "",
          liveLink: "",
          description: "",
        }
      : {
          title: projectDetail && projectDetail.project_name,
          projectLink: projectDetail && projectDetail.project_link,
          liveLink: projectDetail && projectDetail.live_link,
          description: projectDetail && projectDetail.description,
        }
  );
  const [isCheckedDeployed, setIsCheckedDeployed] = useState(false);
  const editStartData =
    !isAdd && projectDetail && projectDetail.start_date.split(" ");
  const editEndData =
    !isAdd && projectDetail && projectDetail.end_date.split(" ");
  const [startDate, setStartDate] = useState(
    isAdd ? ["", ""] : projectDetail && [editStartData[0], editStartData[1]]
  );
  const [endDate, setEndDate] = useState(
    isAdd ? ["", ""] : projectDetail && (editEndData[0]=="Present" ? ["",""] : [editEndData[0], editEndData[1]])
  );
  const [isCheckedEndDate, setIsCheckedEndDate] = useState(
    editEndData && (editEndData[0] == "Present" ? true : false)
  );
  const [display1, setDisplay1] = useState([false, false]);
  const [display2, setDisplay2] = useState([false, false]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_profile: localStorage.userId,
      project_name: addProjectsObj.title,
      description: addProjectsObj.description,
      project_link: addProjectsObj.projectLink,
      live_link: isAdd
        ? isCheckedDeployed
          ? addProjectsObj.liveLink
          : null
        : addProjectsObj.liveLink,
      start_date: `${startDate[0]} ${startDate[1]}`,
      end_date: !isCheckedEndDate ? `${endDate[0]} ${endDate[1]}` : "Present",
    };
    if (isAdd) {
      addProject({ data: data, url: "profile/project/" })
        .unwrap()
        .then((payload) => {
          const newArray = Array.from(userDetails.projects);
          dispatch(
            setUserDetails({
              ...userDetails,
              projects: [...newArray, payload],
            })
          );
        });
    } else {
      editProject({ data: data, url: `profile/project/${id}` })
        .unwrap()
        .then((payload) => {
          const idx = userDetails.projects.indexOf(projectDetail);
          const newArray = Array.from(userDetails.projects);
          newArray[idx] = payload;
          dispatch(
            setUserDetails({
              ...userDetails,
              projects: [...newArray],
            })
          );
        });
    }
    navigate("/profile");
  };

  return (
    <>
    <CoverBackground/>
      {userDetails && (
        <main
          className="popUp-container"
          style={{ height: "40rem", top: "0.4rem" }}
        >
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <ImCross size={23} color="white" className="cancelIcon" />
          </Link>
          <h1 style={{ textAlign: "center" }}>
            {isAdd ? "Add" : "Edit"} Project
          </h1>
          <form className={`add-container`} onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={addProjectsObj.title}
              onChange={(e) => {
                setAddProjectsObj({
                  ...addProjectsObj,
                  title: e.target.value,
                });
              }}
              className="input"
              required
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
                    setDisplay1(display1[0] ? [false, false] : [true, false]);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Start Month"
                    className="input"
                    value={startDate[0]}
                    onChange={() => {}}
                    required
                  />
                  <BsChevronDown
                    size={27}
                    color="white"
                    className="inputIcon"
                  />
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
                    value={startDate[1]}
                    onChange={() => {}}
                    className="input"
                    required
                  />
                  <BsChevronDown
                    size={27}
                    color="white"
                    className="inputIcon"
                  />
                </div>
              </div>
              <DoubleDropDown
                top={"13.5rem"}
                arr1={months}
                arr2={yearsArray}
                display={display1}
                setDisplay={setDisplay1}
                input={startDate}
                setInput={setStartDate}
              />
            </div>
            {/* <p style={{color:"red",margin:"0",fontSize:"0.5rem",width:"98%"}}>Enter date</p> */}
            {!isCheckedEndDate && (
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
                      value={endDate[0]}
                      onChange={() => {}}
                      className="input"
                      required
                    />
                    <BsChevronDown size={27} color="white" />
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
                      value={endDate[1]}
                      onChange={() => {}}
                      className="input"
                      required
                    />
                    <BsChevronDown size={27} color="white" />
                  </div>
                </div>

                <DoubleDropDown
                  top={"16.7rem"}
                  arr1={months}
                  arr2={yearsArray}
                  display={display2}
                  setDisplay={setDisplay2}
                  input={endDate}
                  setInput={setEndDate}
                />
              </div>
            )}
            <input
              type="text"
              placeholder="Project Link"
              value={addProjectsObj.projectLink}
              onChange={(e) => {
                setAddProjectsObj({
                  ...addProjectsObj,
                  projectLink: e.target.value,
                });
              }}
              required
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
                value={addProjectsObj.liveLink}
                onChange={(e) => {
                  setAddProjectsObj({
                    ...addProjectsObj,
                    liveLink: e.target.value,
                  });
                }}
                required
              />
            )}
            <textarea
              name="description"
              id="Description"
              rows="8"
              placeholder="Description"
              value={addProjectsObj.description}
              onChange={(e) => {
                setAddProjectsObj({
                  ...addProjectsObj,
                  description: e.target.value,
                });
              }}
            ></textarea>
            <div className="nextBtn-container nextBtnEdu">
              <button className="nextbtn" type="submit">
                <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
              </button>
            </div>
          </form>
        </main>
      )}
    </>
  );
}

export default AddProjects;
