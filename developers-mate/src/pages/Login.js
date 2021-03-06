import { React, useState, useEffect } from "react";
import "../style/Login.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import api from "../api/UnProtectedApi";
import close from "../assets/profile/close.png";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [errorMsg,setErrorMsg] = useState("");  
  const [showBtn,setShowBtn] = useState(true);
  const validate = yup.object({
    email: yup
      .string()
      .email("Please Enter a valid Email")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      setShowBtn(false)
      const response = await api.post("api/token/", data);
      setShowBtn(true)
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("userId", jwt_decode(response.data.access).user_id);
      localStorage.setItem(
        "profile",
        jwt_decode(response.data.access).have_profile
      );
      if (localStorage.getItem("profile")) {
        navigate("/");
        window.location.reload();
      }
      else {
        navigate("/addUserDetails");
        window.location.reload();
      }
    } catch (err) {
      setShowBtn(true);
      setErrorMsg(err.response.data.detail);
      setError(1);
      setTimeout(() => {
        setError(0);
      }, 5000);
    }
  };

  return (
    <>
      <Navbar title={"Sign Up"} />
      <main className="loginsignupPage">
        <div className={`errorMessage ${error ? "displayError" : "hideError"}`}>
          {error && <img src={close} alt="" />}
          {error && <h4>{errorMsg}</h4>}
        </div>
        <div className="loginSignupPageContainer">
          <h1>Login to Your Account</h1>
          <h3>
            Find your perfect match for your Next Project from 1000+ Developers
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
                <button
                  className="loginSignupBtn"
                  type="submit"
                  disabled={!formik.isValid || !showBtn}
                >
                  <h4 style={{ margin: "0", fontWeight: "500" }}>
                    Login to Your Account
                  </h4>
                  {
                    showBtn ? 
                    <AiOutlineArrowRight size={23} />
                    :

                  <img style={{width:"23px"}} src={"https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"} alt="" />
                  }
                </button>
                <Link to={"/signup"} style={{ textDecoration: "none" }}>
                  <h6>Don't have an Account?</h6>
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
}

export default Login;
