import React from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import api from "../api/UnProtectedApi";

function Navbar({ title }) {
  const navigate = useNavigate();
  const onSubmit = async () => {
    const data = {
      email: "hello@gmail.com",
      password: "abcdefgh",
    };
    try {
      const response = await api.post("api/token/", data);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("userId", jwt_decode(response.data.access).user_id);
      localStorage.setItem(
        "profile",
        jwt_decode(response.data.access).have_profile
      );

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <nav className="navbar-container">
      <div className="navbarContent">
        <h2 style={{ fontSize: "2rem" }}>DevelopersMate.</h2>
        <div>
          <Link to={title == "Sign Up" ? "/signup" : "/login"}>
            <button className="navbar-btn">
              <h4 style={{ margin: "0", fontWeight: "500" }}>{title}</h4>
            </button>
          </Link>
          <button className="navbar-btn" onClick={()=>{onSubmit()}}>
            <h4 style={{ margin: "0", fontWeight: "500" }}>
              {"Login for viewer"}
            </h4>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
