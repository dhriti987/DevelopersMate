import React, { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/find-developers/FindDevelopers.css";
import { AiFillFilter } from "react-icons/ai";
import BoxDropDown from "../components/find-developers/BoxDropDown";
import FilterDropDown from "../components/find-developers/FilterDropDown";
import axios from "axios";
import {skillsArray} from "../data/SkillsData.js";
import FilteredProfile from "../components/find-developers/FilteredProfile";

function FindDevelopers() {
  const [countries , setCountries] = useState(null);

  useEffect(()=>{
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
      response.data.data.forEach((item)=>{
        newCountryArr.push(item.name);
      })
      setCountries(newCountryArr);
    };
    fetch();
  },[])
  
  return (
    <>
      <PrivateNavbar />
      <main className="findMainContainer">
            <div className="filterContainer">
                <div className="head">
                    <AiFillFilter size={23} color="white"/>
                    <h1>Filter</h1>
                </div>
                <div className="filterInputContainer">
                    <BoxDropDown dropDownItems = {skillsArray}/>
                    <FilterDropDown dropDownItems = {countries ? countries : []} title="Country"/>
                </div>
            </div>
            <div className="userContainer">
              <FilteredProfile/>
            </div>
      </main>
    </>
  );
}

export default FindDevelopers;
