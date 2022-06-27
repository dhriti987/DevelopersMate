import React, { useState, useEffect, Profiler } from "react";
import "../style/PrivateNavbar.css";
import { BsSearch,BsFillChatDotsFill,BsPersonCircle } from "react-icons/bs";
import { ImHome } from "react-icons/im";
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

            <h2 style={{flexbasis:"45%"}}>DevelopersMate.</h2>
          <div className="navbarLinks">
          <Link to={"/home"} className="navbarLinks" style={window.location.pathname==="/home" ? {background:"#2b2b2b"} : {}}>
            <ImHome size={30} color="#cdcdcd" />
          </Link>
          <Link to={"/chat"} className="navbarLinks" style={window.location.pathname==="/chat" ? {background:"#2b2b2b"} : {}}>
            <BsFillChatDotsFill size={30} color="#cdcdcd"/>
          </Link>
          <Link to={"/profile"} className="navbarLinks" style={window.location.pathname==="/profile" ? {background:"#2b2b2b"} : {}}>
            <BsPersonCircle size={30} color="#cdcdcd"/>
          </Link>
          </div>
          
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
