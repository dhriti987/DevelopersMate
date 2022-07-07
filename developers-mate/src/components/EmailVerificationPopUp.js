import React from "react";
import "../style/EmailVerificationPopUp.css";
import img from "../assets/common/emailVerificationMsg.jpeg";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function EmailVerificationPopUp({ success, setSuccess, email }) {
  const navigate = useNavigate();
  return (
    <div className={`${success ? "displaySuccess" : "hideSuccess"}`}>
      <div className={`EmailVerificationPopUpContainer`}>
        <ImCross
          size={23}
          className="cancelBtn"
          onClick={() => {
            setSuccess(false);
            navigate("/login");
          }}
        />
        <div className="EmailVerificationPopUpImg">
          <img src={img} alt="" />
        </div>
        <h1>Email Confirmation</h1>
        <h4>
          We have sent email to{" "}
          <span style={{ color: "crimson" }}>{email}</span> to confirm the
          validity of your email address. After recieving the email follow the
          link provided to complete ypur registration.
        </h4>
      </div>
    </div>
  );
}

export default EmailVerificationPopUp;
