import React from "react";
import { useParams, Link } from "react-router-dom";
import "../style/EmailVerification.css";
import emailVerified from "../assets/common/emailVerified.jpeg";

function EmailVerification() {
  const { userToken } = useParams();
  return (
    <div className="emailVerificationContainer">
      <div className="emailVerificationImg">
        <img src={emailVerified} alt="" />
      </div>
      <h1>Email Verified</h1>
      <div>
        <h2>You have successfully verified your email! </h2>
        <h2>You can now close this page and sign in with your new account</h2>
      </div>
      <Link to={"/login"}>
        <button>
          <h2>Go to Login</h2>
        </button>
      </Link>
    </div>
  );
}

export default EmailVerification;
