import React from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/find-developers/FindDevelopers.css";
import { AiFillFilter } from "react-icons/ai";
import BoxDropDown from "../components/find-developers/BoxDropDown";


function FindDevelopers() {
  const skills = ["React","Angular" , "Python","Java" , "C++"]
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
                    <BoxDropDown dropDownItems = {skills}/>

                </div>
            </div>
            <div className="userContainer">

            </div>
      </main>
    </>
  );
}

export default FindDevelopers;
