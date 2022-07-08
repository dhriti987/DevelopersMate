import { useState, React, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/profile/CommonAdd.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import DoubleDropDown from "../DoubleDropDown";
import { yearsArray } from "../../data/YearsData";
import {
  usePostRequestMutation,
  usePatchRequestMutation,
} from "../../redux/PrivateApi";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/UserDetails";
import CoverBackground from "../CoverBackground";
import CloseButton from "../CloseButton";
import ApiLoading from "../ApiLoading";

function AddEducation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdd = window.location.href.includes("add");
  const [addEducation, postResponse] = usePostRequestMutation();
  const [editEducation, patchResponse] = usePatchRequestMutation();
  const userDetails = useSelector((state) => state.userDetails.value);
  useEffect(() => {
    if (userDetails === null || userDetails === undefined) {
      navigate("/profile");
    }
  }, []);
  const dispatch = useDispatch();
  const eduDetail =
    !isAdd &&
    userDetails &&
    userDetails.education.filter((item) => item.id == id)[0];
  const [title, setTitle] = useState(
    isAdd ? "" : eduDetail && eduDetail.college_name
  );
  const [degree, setDegree] = useState(
    isAdd ? "" : eduDetail && eduDetail.degree
  );
  const [year, setYear] = useState(
    isAdd
      ? ["", ""]
      : eduDetail
      ? [eduDetail.start_year, eduDetail.passing_year]
      : ["", ""]
  );
  const [display, setDisplay] = useState([false, false]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_profile: localStorage.getItem("userId"),
      college_name: title,
      degree: degree,
      start_year: year[0],
      passing_year: year[1],
    };
    if (isAdd) {
      await addEducation({ data: data, url: "profile/education/" })
        .unwrap()
        .then((payload) => {
          const newArray = Array.from(userDetails.education);
          dispatch(
            setUserDetails({
              ...userDetails,
              education: [...newArray, payload],
            })
          );
        });
    } else {
      await editEducation({ data: data, url: `profile/education/${id}` })
        .unwrap()
        .then((payload) => {
          const idx = userDetails.education.indexOf(eduDetail);
          const newArray = Array.from(userDetails.education);
          newArray[idx] = payload;
          dispatch(
            setUserDetails({
              ...userDetails,
              education: [...newArray],
            })
          );
        });
    }
    navigate("/profile");
  };

  useEffect(()=>{
    const scroll_to_bottom =  document.querySelector(".popUp-container")
    if (scroll_to_bottom) {
      scroll_to_bottom.scroll({
        top: scroll_to_bottom.scrollHeight,
        behavior: "smooth",
      });
    }
  },[display])

  return (
    <>
      <CoverBackground />
      {(patchResponse.isLoading || postResponse.isLoading) && <ApiLoading />}
      {userDetails && (
        <main className="popUp-container" style={{ justifyContent: "inherit" }}>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <CloseButton />
          </Link>
          <h1 style={{ textAlign: "center" }}>
            {isAdd ? "Add" : "Edit"} Education
          </h1>
          <form className={`add-container`} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="College Name"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Degree"
              value={degree}
              onChange={(e) => {
                setDegree(e.target.value);
              }}
              required
            />
            <div className="DownDouble-container">
              <div className="downDouble">
                <div
                  className="inputContainer"
                  onClick={() => {
                    setDisplay(display[0] ? [false, false] : [true, false]);
                  }}
                >
                  <input
                    type="text"
                    value={year[0]}
                    placeholder="Start Year"
                    className="input"
                    onChange={() => {}}
                    required
                  />
                  {display[0] ? (
                    <BsChevronUp color="white" />
                  ) : (
                    <BsChevronDown color="white" />
                  )}
                </div>
                <div
                  className="inputContainer"
                  onClick={() => {
                    setDisplay(display[1] ? [false, false] : [false, true]);
                  }}
                >
                  <input
                    type="text"
                    value={year[1]}
                    placeholder="End Year"
                    className="input"
                    onChange={() => {}}
                    required
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

export default AddEducation;
