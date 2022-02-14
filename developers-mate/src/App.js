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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
