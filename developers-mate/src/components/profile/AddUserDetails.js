import { React, useEffect, useState } from "react";
import "../../style/profile/CommonAdd.css";
import axios from "axios";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import SingleDropDown from "../SingleDropDown";
import { useNavigate } from "react-router-dom";
import { usePostRequestMutation } from "../../redux/PrivateApi";
import close from "../../assets/profile/close.png";
import "../../style/profile/CommonAdd.css";
import CoverBackground from "../CoverBackground";


function AddUserDetails() {

  const navigate = useNavigate();
  const [postRequest, responseInfo] = usePostRequestMutation();
  // let fs = require('fs');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [dummyCountryList, setDummyCountryList] = useState([]);
  const [dummyStateList, setDummyStateList] = useState([]);
  const [displayCountryList, setDisplayCountryList] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [displayStates, setDisplayState] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [displayStateList, setDisplayStateList] = useState(false);
  const [stateInput, setStateInput] = useState("");
  const [displayCity, setDisplayCity] = useState(false);
  const [genderOptions, setGenderOptions] = useState([
    "Male",
    "Female",
    "Others",
  ]);
  const [displayGender, setDisplayGender] = useState(false);
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);
  // console.log(responseInfo)

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/iso",
        {
          headers: {
            "X-Powered-By": "Express",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
        }
      );
      response.data.data.map((item) => {
        countryList.push(item.name);
      });
      setDummyCountryList(countryList);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (dummyCountryList.length !== 0) {
      const newCountryList = dummyCountryList.filter((item) => {
        return item.toLowerCase().includes(countryInput.toLowerCase());
      });
      setCountryList(newCountryList);
    }
  }, [countryInput]);

  const handleCountry = async (e, item) => {
    setCountryInput(e.target.textContent);
    setDisplayCountryList(false);
    setDisplayStateList(false);
    setDisplayCity(false);
    setStateInput("");
    const data = {
      country: item,
    };
    stateList.splice(0, stateList.length);
    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      data,
      {
        headers: {
          "X-Powered-By": "Express",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
    response.data.data.states.map((item) => {
      stateList.push(item.name);
      dummyStateList.push(item.name);
    });
    setDisplayState(true);
  };

  useEffect(() => {
    if (dummyCountryList.length !== 0) {
      const newStateList = dummyStateList.filter((item) => {
        return item.toLowerCase().includes(stateInput.toLowerCase());
      });
      setStateList(newStateList);
    }
  }, [stateInput]);

  const handleStateClick = (e) => {
    setStateInput(e.target.textContent);
    setDisplayStateList(false);
    setDisplayCity(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user: localStorage.getItem("userId"),
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      country: countryInput,
      state: stateInput,
      city: city,
      bio: "",
    };

    await postRequest({ data: data, url: "/profile/profile/" })
      .unwrap()
      .then(() => {
        localStorage.setItem("profile","true");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setError(err.data.user[0]);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  return (
    <>
    <CoverBackground/>
    <main className="popUp-container">
      <div className={`errorMessage ${error ? "displayError" : "hideError"}`}>
        {error && <img src={close} alt="" />}
        {error && <h4>{error}</h4>}
      </div>
      <h1 style={{ textAlign: "center" }}>User Details</h1>
      <form className="add-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <div className="DownSingle-contianer">
          <div
            className="inputContainer"
            onClick={() => {
              setDisplayGender(true);
            }}
          >
            <input
              type="text"
              placeholder="Gender"
              defaultValue={gender}
              autoComplete="new-password"
              className="input"
            />
            {displayGender ? (
              <BiChevronUp size={27} color="white" className="inputIcon" />
            ) : (
              <BiChevronDown size={27} color="white" className="inputIcon" />
            )}
          </div>

          <SingleDropDown
            arr={genderOptions}
            setInput={setGender}
            displayOptions={displayGender}
            setDisplayOptions={setDisplayGender}
            anyfuntion={() => {}}
          />
        </div>
        <div className="DownSingle-contianer">
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Country"
              value={countryInput}
              onClick={() => {
                setDisplayCountryList(displayCountryList ? false : true);
              }}
              onChange={(e) => {
                setCountryInput(e.target.value);
                setDisplayState(false);
              }}
              autoComplete="new-password"
              className="input"
            />
          </div>

          {displayCountryList && (
            <SingleDropDown
              arr={countryList}
              setInput={setCountryInput}
              anyfuntion={handleCountry}
              displayOptions={displayCountryList}
              setDisplayOptions={setDisplayCountryList}
            />
          )}
        </div>
        {displayStates && (
          <div className="DownSingle-contianer">
            <div className="inputContainer">
              <input
                type="text"
                placeholder="State"
                autoComplete="new-password"
                value={stateInput}
                onClick={() => {
                  setDisplayStateList(displayStateList ? false : true);
                  setDisplayCity(false);
                }}
                onChange={(e) => {
                  setStateInput(e.target.value);
                }}
              />
              {displayStateList && (
                <SingleDropDown
                  top={"20.3rem"}
                  arr={stateList}
                  setInput={setStateInput}
                  anyfuntion={handleStateClick}
                  displayOptions={displayStateList}
                  setDisplayOptions={setDisplayStateList}
                />
              )}
            </div>
          </div>
        )}
        {displayCity && (
          <input
            type="text"
            placeholder="City"
            autoComplete="new-password"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        )}
        <div className="nextBtn-container nextBtnEdu nextBtnUserDetails">
          <button className="nextbtn" type="submit">
            <h4 style={{ margin: "0" }}>Next</h4>
          </button>
        </div>
      </form>
    </main>
    </>
  );
}

export default AddUserDetails;
