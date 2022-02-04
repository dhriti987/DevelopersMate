import './App.css';
import Login from './pages/Login';
import { Routes, Route, Link } from "react-router-dom";
import SignUp from './pages/SignUp';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
