import { React, useEffect, useState } from "react";
import "../../style/profile/UserDetails.css";
import axios from "axios";
import {Link} from "react-router-dom";
import { BiChevronDown,BiChevronUp,BiRightArrowCircle } from "react-icons/bi";

function AddUserDetails() {
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
  const [genderOptions,setGenderOptions]=useState(["Male","Female","Others"]);
  const [displayGender, setDisplayGender] = useState(false);
  const [gender,setGender]=useState("");

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/iso"
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
      data
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

  return (
    <main className="popUp-container">
      <h1 style={{ textAlign: "center" }}>User Details</h1>
      <form className="form">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />

        <div className=" genderContainer" >
          <div className="gender" onClick={()=>{setDisplayGender(true)}}>
            <input
              type="text"
              placeholder="Gender"
              defaultValue={gender}
              autoComplete="new-password"
            />
            {displayGender ? <BiChevronUp size={27} color="white" /> : <BiChevronDown size={27} color="white" />}
          </div>
          <div className={`dropDown ${displayGender ? "displayGenderOptions" : "hideGenderOptions"}`}>
            {
              genderOptions.map((item,idx)=>{
                return(
                  <h4 onClick={(e)=>{
                    setDisplayGender(false)
                    setGender(e.target.textContent)
                  }} key={`gender${idx}`}>{item}</h4>
                )
              })
            }
          </div>
        </div>
        <div className="country">
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
          />
          {displayCountryList && (
            <div
              className={`dropDown ${
                countryList.length > 4 ? "showCountryList" : "hideCountryList"
              }`}
              style={{ zIndex: "10" }}
            >
              {countryList.map((item, idx) => {
                return (
                  <h4
                    key={`country${idx}`}
                    onClick={(e) => {
                      handleCountry(e, item);
                    }}
                  >
                    {item}
                  </h4>
                );
              })}
            </div>
          )}
        </div>
        {displayStates && (
          <div className="country">
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
              <div
                className={`dropDown ${
                  stateList.length > 4 ? "showStateList" : "hideStateList"
                }`}
              >
                {stateList.map((item, idx) => {
                  return (
                    <h4
                      key={`stateList${idx}`}
                      onClick={(e) => handleStateClick(e)}
                    >
                      {item}
                    </h4>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {displayCity && (
          <div className="country">
            <input type="text" placeholder="City" autoComplete="new-password" />
          </div>
        )}
        <div className="nextBtn-container nextBtnEdu nextBtnUserDetails">
        <Link to="/home/addskills" style={{textDecoration:"none"}}>
          <button className="nextbtn">
            <h4 style={{ margin: "0" }}>Next</h4>
            <BiRightArrowCircle size={23}/>
          </button>
        </Link>
      </div>
      </form>
    </main>
  );
}

export default AddUserDetails;
