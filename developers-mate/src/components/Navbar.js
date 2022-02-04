import React from "react";
import "../style/Navbar.css";
import {Link} from 'react-router-dom'


function Navbar({ title }) {
  return (
    <nav className="navbar-container">
      <div className="navbarContent">
        <h2>DevelopersMate.</h2>
        <Link to={title == "Sign Up" ? "/signup" : "/login"}>
          <button className="navbar-btn">
            <h4 style={{ margin: "0", fontWeight: "500" }}>{title}</h4>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
