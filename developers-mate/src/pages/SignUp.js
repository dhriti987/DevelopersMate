import React, { useState } from "react";
import "../style/Login.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import api from "../api/UnProtectedApi";
import close from "../assets/profile/close.png";
import check from "../assets/profile/check.png";
import { useNavigate } from "react-router-dom";
import EmailVerificationPopUp from "../components/EmailVerificationPopUp";

function SignUp() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const validate = yup.object({
    email: yup
      .string()
      .email("Please Enter a valid Email")
      .required("Email is required"),
    username: yup
      .string()
      .min(3, "Please Enter minimum 3 characters")
      .required("userName is required"),
    password: yup
      .string()
      .min(8, "Please Enter minimum 8 characters")
      .required("Email is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm password")
      .oneOf([yup.ref("password"), null], "Password must match"),
  });

  const onSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await api.post("auth/register/", data);
      console.log(response);
      setSuccess(1);
      setError(null);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log(err.message);
      console.log(err.response);
      setError(1);
      setSuccess(null);
      setTimeout(() => {
        setError(0);
      }, 5000);
    }
  };

  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <>
      <Navbar title={"Login"} />
      <main className="loginsignupPage">
        <div className={`errorMessage ${error ? "displayError" : "hideError"}`}>
          {error && <img src={close} alt="" />}
          {error && <h4>This Email Already Exist!</h4>}
        </div>
          <EmailVerificationPopUp success={success} setSuccess={setSuccess} />
        <div className="loginSignupPageContainer">
          <h1>SignUp</h1>
          <h3>
            Find your perfect match for your Next Project from 1000+ Developers
            around the world
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validate}
          >
            {(formik) => (
              <form className="loginSignupForm" onSubmit={formik.handleSubmit}>
                <div className="email">
                  <input
                    type="email"
                    className="emialInput"
                    name="email"
                    id="Email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                  )}
                </div>
                <div className="name">
                  <input
                    type="text"
                    className="nameInput"
                    name="username"
                    id="Name"
                    placeholder="UserName"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p>{formik.errors.username}</p>
                  )}
                </div>
                <div className="password">
                  <input
                    type="password"
                    className="passwordInput"
                    name="password"
                    id="Password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                  )}
                </div>
                <div className="confirmPassword">
                  <input
                    type="password"
                    className="confirmPasswordInput"
                    name="confirmPassword"
                    id="ConfirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p>{formik.errors.confirmPassword}</p>
                    )}
                </div>
                <button
                  className="loginSignupBtn"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  <h4 style={{ margin: "0", fontWeight: "500" }}>SignUp</h4>
                  <AiOutlineArrowRight size={23} />
                </button>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <h6>Already have an Account?</h6>
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
}

export default SignUp;
