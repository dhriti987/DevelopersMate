import React, { useState } from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import api from "../api/UnProtectedApi";
import loading from "../assets/common/loading.gif";

function Navbar({ title }) {
  const navigate = useNavigate();
  const [isLoading, setIsLaoding] = useState(false);
  const onSubmit = async () => {
    const data = {
      email: "hello@gmail.com",
      password: "abcdefgh",
    };
    try {
      setIsLaoding(true)
      const response = await api.post("api/token/", data);
      setIsLaoding(false)
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
        setIsLaoding(false)
    }
  };
  return (
    <nav className="navbar-container">
      <div className="navbarContent">
        <h2 style={{ fontSize: "2rem" }}>DevelopersMate.</h2>
        <div style={{ display: "flex" }}>
          <Link
            to={title == "Sign Up" ? "/signup" : "/login"}
            style={{ textDecoration: "none" }}
          >
            <button className="navbar-btn">
              <h4 style={{ margin: "0", fontWeight: "500" }}>{title}</h4>
            </button>
          </Link>
          <button
            className="navbar-btn"
            onClick={() => {
              onSubmit();
            }}
            style={{ width: "10rem" }}
          >
            <h4 style={{ margin: "0", fontWeight: "500" }}>
              {"Login as viewer"}
            </h4>
            {isLoading && (
              <div style={{ width: "1rem", height: "1rem" }}>
                <img
                  src={loading}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
