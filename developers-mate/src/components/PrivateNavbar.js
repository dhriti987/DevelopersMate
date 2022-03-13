import React, { useState, useEffect, Profiler } from "react";
import "../style/PrivateNavbar.css";
import { BsSearch } from "react-icons/bs";
import { useGetRequestMutation } from "../redux/PrivateApi";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setOtherUserId} from "../redux/OtherUserId";
// Profiler/search/?query=""
function PrivateNavbar() {
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState("");
  const [searchTheResult] = useGetRequestMutation();
  const [searchedUserResults, setSearchedUserResults] = useState([]);
  useEffect(() => {
    searchTheResult(`profile/search/?query=${searchResult}`)
      .unwrap()
      .then((payload) => {
        setSearchedUserResults(payload);
      });
  }, [searchResult]);

  return (
    <nav className="navbarContainer">
      <div className="navbarContent">
        <div className="navbarLinks">
          <h2>DevelopersMate.</h2>
        </div>
        <div className="navbarSearchBar">
          <div className="searchIcon" style={searchedUserResults.length ? {borderBottomLeftRadius:"0"} : {}}>
            <BsSearch size={20} color="white" />
          </div>
          <input
            type="text"
            placeholder="Search for other Developers"
            value={searchResult}
            onChange={(e) => {
              setSearchResult(e.target.value);
            }}
            style={searchedUserResults.length ? { width: "18rem",borderBottomRightRadius:"0" } : {}}
          />
          <div className="searchedResults">
            {searchedUserResults.map((item, idx) => {
              return (
                <Link to="/profile" className="searchedUserDetails" key={`search${idx}`} onClick={()=>{
                    dispatch(setOtherUserId(item.user))
                }}>
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
  );
}

export default PrivateNavbar;
