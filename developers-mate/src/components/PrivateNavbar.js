import React, { useState, useEffect, Profiler } from "react";
import "../style/PrivateNavbar.css";
import { BsSearch, BsFillChatDotsFill, BsPersonCircle } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { MdPersonSearch } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useGetRequestMutation } from "../redux/PrivateApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOtherUserId } from "../redux/OtherUserId";
import { setUserDetails } from "../redux/UserDetails";
import CoverBackground from "../components/CoverBackground";

function PrivateNavbar() {
  const dispatch = useDispatch();
  const [getReq] = useGetRequestMutation();
  const [searchedUserResults, setSearchedUserResults] = useState([]);
  const [displayNavbarText, setDisplayNavbarText] = useState({
    home: false,
    chat: false,
    finddevelopers: false,
    profile: false,
    logout:false
  });
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
    getReq(`profile/search/?query=${e.target.value}`)
      .unwrap()
      .then((payload) => {
        setSearchedUserResults(payload);
      });
  };

  const handleSearchUser = async (userId) => {
    dispatch(setOtherUserId(userId));
    setSearchInput("");
    getReq(`profile/profile/?id=${userId}`)
      .unwrap()
      .then((payload) => {
        dispatch(setUserDetails(payload));
        setSearchedUserResults([]);
      });
  };

  return (
    <>
      {searchedUserResults.length > 0 && <CoverBackground />}
      <nav className="navbarContainer">
        <div className="navbarContent">
          <h2 style={{ flexbasis: "45%" }}>DevelopersMate.</h2>
          <div className="navbarLinks">
            <Link
              to={"/"}
              className="navbarLinks"
              style={
                window.location.pathname === "/"
                  ? { background: "#2b2b2b" }
                  : {}
              }
              onMouseOver={() => {
                setDisplayNavbarText((prev) => ({
                  ...prev,
                  home: true,
                }));
              }}
              onMouseOut={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  home: false,
                });
              }}
            >
              <ImHome size={30} color="#cdcdcd" />
              <p
                style={
                  displayNavbarText.home ? { opacity: "1" } : { opacity: "0" }
                }
              >
                Home
              </p>
            </Link>
            <Link
              to={"/chat"}
              className="navbarLinks"
              style={
                window.location.pathname === "/chat"
                  ? { background: "#2b2b2b" }
                  : {}
              }
              onMouseOver={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  chat: true,
                });
              }}
              onMouseOut={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  chat: false,
                });
              }}
            >
              <BsFillChatDotsFill size={30} color="#cdcdcd" />
              <p
                style={
                  displayNavbarText.chat ? { opacity: "1" } : { opacity: "0" }
                }
              >
                Chat
              </p>
            </Link>
            <Link
              to={"/finddevelopers"}
              className="navbarLinks"
              style={
                window.location.pathname === "/finddevelopers"
                  ? { background: "#2b2b2b" }
                  : {}
              }
              onMouseOver={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  finddevelopers: true,
                });
              }}
              onMouseOut={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  finddevelopers: false,
                });
              }}
            >
              <MdPersonSearch size={30} color="#cdcdcd" />
              <p
                style={
                  displayNavbarText.finddevelopers
                    ? { opacity: "1" }
                    : { opacity: "0" }
                }
              >
                Find Developers
              </p>
            </Link>
            <Link
              to={"/profile"}
              className="navbarLinks"
              style={
                window.location.pathname === "/profile"
                  ? { background: "#2b2b2b" }
                  : {}
              }
              onMouseOver={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  profile: true,
                });
              }}
              onMouseOut={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  profile: false,
                });
              }}
            >
              <BsPersonCircle size={30} color="#cdcdcd" />
              <p
                style={
                  displayNavbarText.profile
                    ? { opacity: "1" }
                    : { opacity: "0" }
                }
              >
                Profile
              </p>
            </Link>
            <Link
              to={"/login"}
              className="navbarLinks"
              onClick={()=>{
                localStorage.clear();
              }}
              onMouseOver={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  logout: true,
                });
              }}
              onMouseOut={() => {
                setDisplayNavbarText({
                  ...displayNavbarText,
                  logout: false,
                });
              }}
            >
              <FiLogOut size={30} color="#cdcdcd" />
              <p
                style={
                  displayNavbarText.logout
                    ? { opacity: "1" }
                    : { opacity: "0" }
                }
              >
                Logout
              </p>
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
              value={searchInput}
              onChange={(e) => {
                handleSearchChange(e);
              }}
              style={
                searchedUserResults.length
                  ? { width: "18rem", borderBottomRightRadius: "0" }
                  : {}
              }
            />
            <div
              className={`searchedResults ${
                searchedUserResults.length > 5
                  ? "searchedResultsWithMoreSearch"
                  : ""
              }`}
              style={
                searchedUserResults.length
                  ? { width: "20.6rem", borderBottomRightRadius: "0" }
                  : {}
              }
            >
              {searchedUserResults.map((item, idx) => {
                return (
                  <>
                    <Link
                      to="/profile"
                      className={`searchedUserDetails`}
                      key={`search${idx}`}
                      onClick={() => handleSearchUser(item.user)}
                    >
                      <img src={item.image} alt="" />
                      <h5>
                        {item.first_name} {item.last_name}
                      </h5>
                    </Link>
                  </>
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
