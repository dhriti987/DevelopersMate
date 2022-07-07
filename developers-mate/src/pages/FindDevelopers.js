import React, { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/find-developers/FindDevelopers.css";
import { AiFillFilter } from "react-icons/ai";
import BoxDropDown from "../components/find-developers/BoxDropDown";
import FilterDropDown from "../components/find-developers/FilterDropDown";
import axios from "axios";
import { skillsArray } from "../data/SkillsData.js";
import FilteredProfile from "../components/find-developers/FilteredProfile";
import { useDispatch } from "react-redux";
import { setOtherUserId } from "../redux/OtherUserId";
import nothingIllustration from "../assets/profile/nothingIllustration.jpeg";
import ApiLoading from "../components/ApiLoading";

import { setCurrentThread } from "../redux/CurrentThread";
function FindDevelopers() {
  const [countries, setCountries] = useState(null);
  const [skillArr, setSkillsArr] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOtherUserId(null));
    dispatch(setCurrentThread(null));
  }, []);

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
      const newCountryArr = [];
      response.data.data.forEach((item) => {
        newCountryArr.push(item.name);
      });
      setCountries(newCountryArr);
    };
    fetch();
  }, []);

  useEffect(async () => {
    try {
      const newSkillsArr = skillArr.map((item) => item.toLowerCase());
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/profile/filter/`,
        {
          params: {
            skills: newSkillsArr,
            country: selectedCountry,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setLoading(false);
      setFilteredUsers(response.data);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
    }
  }, [skillArr, selectedCountry]);

  return (
    <>
      {loading && <ApiLoading />}
      <PrivateNavbar />
      <main className="findMainContainer">
        <div className="filterContainer">
          <div className="head">
            <AiFillFilter size={23} color="white" />
            <h1>Filter</h1>
          </div>
          <div className="filterInputContainer">
            <BoxDropDown
              dropDownItems={skillsArray}
              setListItems={setSkillsArr}
              listItems={skillArr}
            />
            <FilterDropDown
              dropDownItems={countries ? countries : []}
              setSelectedItem={setSelectedCountry}
              title="Country"
            />
          </div>
        </div>
        <div className="userContainer">
          {filteredUsers &&
            filteredUsers.map((item, idx) => {
              return (
                <FilteredProfile
                  name={`${item.first_name} ${item.last_name}`}
                  headline={item.headline}
                  userId={item.user}
                  userImg={item.image}
                  key={`filteredUser${idx}`}
                />
              );
            })}
          {filteredUsers && !filteredUsers.length && (
            <div className="nothingToSee">
              <div className="nothingToSeeImg">
                <img src={nothingIllustration} alt="" />
              </div>
              <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                No Developers found!
              </h2>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default FindDevelopers;
