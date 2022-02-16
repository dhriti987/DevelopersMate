import "./App.css";
import Login from "./pages/Login";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AddSkills from "./components/profile/AddSkills";
import Home from "./pages/Home";
import AddEducation from "./components/profile/AddEducation";
import AddUserDetails from "./components/profile/AddUserDetails";
import AddExperience from "./components/profile/AddExperience";
import Profile from "./pages/Profile";
import AddProjects from "./components/profile/AddProjects";
import AddBio from "./components/profile/AddBio";
import AddInto from "./components/profile/AddInto";
import PrivateRoute from "./utils/PrivateRoute";
import PostDetailPopUp from "./components/home/PostDetailPopUp";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthToken } from "./redux/authTokens";
import axios from "axios";

function App() {
  const authToken = useSelector((state) => state.authToken.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      const updateToken = async () => {
        if (authToken) {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              refresh: localStorage.getItem("refresh"),
            }
          );
          dispatch(setAuthToken(response.data));
          localStorage.setItem("access", response.data.access);
          console.log(authToken)
        }
      };
      updateToken();
    }, 2000);
    return () => clearInterval(interval);
  }, [authToken]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route exact path="adduserdetails" element={<AddUserDetails />} />
            <Route exact path="addskills" element={<AddSkills />} />
            <Route exact path="addexperience" element={<AddExperience />} />
            <Route exact path="addeducation" element={<AddEducation />} />
            <Route exact path="addproject" element={<AddProjects />} />
            <Route exact path="addintro" element={<AddInto />} />
            <Route exact path="addbio" element={<AddBio />} />
            <Route exact path="editbio" element={<AddBio />} />
            <Route exact path="edituserdetails" element={<AddUserDetails />} />
            <Route exact path="editexperience" element={<AddExperience />} />
            <Route exact path="editeducation" element={<AddEducation />} />
            <Route exact path="editproject" element={<AddProjects />} />
            <Route exact path="editintro" element={<AddInto />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route exact path="postdetailpopup" element={<PostDetailPopUp />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
