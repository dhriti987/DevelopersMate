import React, { useState, useEffect, Profiler } from "react";
import "../style/PrivateNavbar.css";
import { BsSearch } from "react-icons/bs";
import { useGetRequestMutation } from "../redux/PrivateApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOtherUserId } from "../redux/OtherUserId";
import CoverBackground from "../components/CoverBackground";

function PrivateNavbar() {
  const dispatch = useDispatch();
  const [searchTheResult] = useGetRequestMutation();
  const [searchedUserResults, setSearchedUserResults] = useState([]);

  const handleSearchChange=async(e)=>{
      searchTheResult(`profile/search/?query=${e.target.value}`)
      .unwrap()
      .then((payload) => {
        setSearchedUserResults(payload);
      });
  }

  return (
    <>
      {searchedUserResults.length > 0 && <CoverBackground />}
      <nav className="navbarContainer">
        <div className="navbarContent">
          <div className="navbarLinks">
            <h2>DevelopersMate.</h2>
          </div>
          <Link to={"/chat"} className="navbarLinks">
            <h2>chat.</h2>
          </Link>
          
          <div className="navbarSearchBar">
            <div
              className="searchIcon"
              style={
                searchedUserResults.length
                  ? { borderBottomLeftRadius: "0" }
                  : {}
              }
            >
              <BsSearch size={20} color="white" />
            </div>
            <input
              type="text"
              placeholder="Search for other Developers"
              // value={searchResult}
              onChange={(e) => {
                handleSearchChange(e)
              }}
              style={
                searchedUserResults.length
                  ? { width: "18rem", borderBottomRightRadius: "0" }
                  : {}
              }
            />
            <div
              className="searchedResults"
              style={
                searchedUserResults.length
                  ? { width: "20.6rem", borderBottomRightRadius: "0" }
                  : {}
              }
            >
              {searchedUserResults.map((item, idx) => {
                return (
                  <Link
                    to="/profile"
                    className="searchedUserDetails"
                    key={`search${idx}`}
                    onClick={() => {
                      dispatch(setOtherUserId(item.user));
                    }}
                  >
                    <img src={item.image} alt="" />
                    <h5>
                      {item.first_name} {item.last_name}
                    </h5>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PrivateNavbar;
