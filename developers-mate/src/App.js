import './App.css';
import Login from './pages/Login';
import { Routes, Route, Link } from "react-router-dom";
import SignUp from './pages/SignUp';
import AddSkills from './components/profile/AddSkills';
import Home from './pages/Home';
import AddEducation from './components/profile/AddEducation';
import AddUserDetails from './components/profile/AddUserDetails';
import AddExperience from './components/profile/AddExperience';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/home' element={<Home/>}>  
          <Route exact path='adduserdetails' element={<AddUserDetails/>}/>
          <Route exact path='addskills' element={<AddSkills/>}/>
          <Route exact path='addexperience' element={<AddExperience/>}/>
          <Route exact path='addeducation' element={<AddEducation/>}/>
        </Route>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
