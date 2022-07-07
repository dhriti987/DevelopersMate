import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/profile/CommonAdd.css";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { employmentArr } from "../../data/EmploymentData";
import CustomizedCheckBox from "../CustomizedCheckBox";
import { Link } from "react-router-dom";
import DoubleDropDown from "../DoubleDropDown";
import SingleDropDown from "../SingleDropDown";
import { yearsArray } from "../../data/YearsData";
import { months } from "../../data/MonthData";
import { useSelector, useDispatch } from "react-redux";
import {
  usePostRequestMutation,
  usePatchRequestMutation,
} from "../../redux/PrivateApi";
import { setUserDetails } from "../../redux/UserDetails";
import CoverBackground from "../CoverBackground";
import CloseButton from "../CloseButton";
import ApiLoading from "../ApiLoading";

function AddExperience() {
  const [displayEmploymenyOptions, setDisplayEmploymenyOptions] =
    useState(false);
  const [editExperience, patchResponse] = usePatchRequestMutation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdd = window.location.href.includes("add");
  const [addExperience, postResponse] = usePostRequestMutation();
  const userDetails = useSelector((state) => state.userDetails.value);
  const dispatch = useDispatch();
  const experienceDetail =
    !isAdd &&
    userDetails &&
    userDetails.experiences.filter((item) => item.id == id)[0];
  const [addExperienceObj, setAddExperienceObj] = useState(
    isAdd
      ? {
          title: "",
          company: "",
          description: "",
        }
      : {
          title: experienceDetail && experienceDetail.title,
          company: experienceDetail && experienceDetail.company_name,
          description: experienceDetail && experienceDetail.description,
        }
  );
  const [employmentInput, setEmploymentInput] = useState(
    isAdd ? "" : experienceDetail && experienceDetail.employment_type
  );
  const editStartData =
    !isAdd && experienceDetail && experienceDetail.start_date.split(" ");
  const editEndData =
    !isAdd && experienceDetail && experienceDetail.end_date.split(" ");
  const [isChecked, setIsChecked] = useState(
    editEndData && editEndData[0] === "Present" ? true : false
  );

  const [startDate, setStartDate] = useState(
    isAdd ? ["", ""] : experienceDetail && [editStartData[0], editStartData[1]]
  );
  const [endDate, setEndDate] = useState(
    isAdd
      ? ["", ""]
      : experienceDetail &&
          (editEndData[0] == "Present"
            ? ["", ""]
            : [editEndData[0], editEndData[1]])
  );
  const [display1, setDisplay1] = useState([false, false]);
  const [display2, setDisplay2] = useState([false, false]);

  useEffect(() => {
    if (userDetails === null || userDetails === undefined) {
      navigate("/profile");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_profile: localStorage.userId,
      title: addExperienceObj.title,
      company_name: addExperienceObj.company,
      employment_type: employmentInput,
      description: addExperienceObj.description,
      start_date: `${startDate[0]} ${startDate[1]}`,
      end_date: isChecked ? "Present" : `${endDate[0]} ${endDate[1]}`,
    };
    if (isAdd) {
      await addExperience({ data: data, url: "profile/experience/" })
        .unwrap()
        .then((payload) => {
          const newArray = Array.from(userDetails.experiences);
          dispatch(
            setUserDetails({
              ...userDetails,
              experiences: [...newArray, payload],
            })
          );
        });
    } else {
      await editExperience({ data: data, url: `/profile/experience/${id}` }).then(
        (payload) => {
          const idx = userDetails.experiences.indexOf(experienceDetail);
          const newArray = Array.from(userDetails.experiences);
          newArray[idx] = payload.data;
          dispatch(
            setUserDetails({
              ...userDetails,
              experiences: [...newArray],
            })
          );
        }
      );
    }
    navigate("/profile");
  };
  return (
    <>
      <CoverBackground />
      {(patchResponse.isLoading || postResponse.isLoading) && 
      <ApiLoading/>
      }
      {userDetails && (
        <main className="popUp-container">
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <CloseButton />
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
              value={addExperienceObj.title}
              onChange={(e) => {
                setAddExperienceObj({
                  ...addExperienceObj,
                  title: e.target.value,
                });
              }}
              required
            />
            <input
              type="text"
              className="Input"
              placeholder="Company Name"
              value={addExperienceObj.company}
              onChange={(e) => {
                setAddExperienceObj({
                  ...addExperienceObj,
                  company: e.target.value,
                });
              }}
              required
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
                  value={employmentInput}
                  className="input"
                  onChange={() => {}}
                  required
                />
                {displayEmploymenyOptions ? (
                  <BiChevronUp size={27} color="white" className="inputIcon" />
                ) : (
                  <BiChevronDown
                    size={27}
                    color="white"
                    className="inputIcon"
                  />
                )}
              </div>
              <SingleDropDown
                arr={employmentArr}
                setInput={setEmploymentInput}
                displayOptions={displayEmploymenyOptions}
                setDisplayOptions={setDisplayEmploymenyOptions}
                anyfuntion={() => {}}
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
                    value={startDate[0]}
                    className="input"
                    onChange={() => {}}
                    required
                  />
                  <BiChevronDown
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
                    className="input"
                    onChange={() => {}}
                    required
                  />
                  <BiChevronDown
                    size={27}
                    color="white"
                    className="inputIcon"
                  />
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
                      value={endDate[0]}
                      className="input"
                      onChange={() => {}}
                      required
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
                      value={endDate[1]}
                      className="input"
                      onChange={() => {}}
                      required
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
            <textarea
              name="description"
              id="Description"
              rows="8"
              placeholder="Description"
              value={addExperienceObj.description}
              onChange={(e) => {
                setAddExperienceObj({
                  ...addExperienceObj,
                  description: e.target.value,
                });
              }}
            ></textarea>
            <div className="nextBtn-container nextBtnUserDetails">
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

export default AddExperience;
