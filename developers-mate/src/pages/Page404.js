import React from "react";
import "../style/Page404.css";
import error404 from "../assets/common/error404.jpeg";
import {Link} from "react-router-dom";

function Page404() {
  return (
    <div className="container404">
      <div className="errorImg">
        <img src={error404} alt="" />
      </div>
      <div className="text">
      <h1>Oops! You ran into an accidental issue.</h1>
      <Link to={"/"}>
        <button><h3>Home</h3></button>
      </Link>
      </div>
    </div>
  );
}

export default Page404;
