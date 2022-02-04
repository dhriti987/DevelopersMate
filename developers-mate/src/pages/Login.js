import React from 'react';
import "../style/Login.css"
import { AiOutlineArrowRight } from 'react-icons/ai';
import Navbar from '../components/Navbar';
import {Link} from 'react-router-dom'


function Login() {
  return (
      <>
        <Navbar title={"Sign Up"}/>
        <main className='loginPage'>
            <div className='Login-container'>

            <h1 >Login to Your Account</h1>
            <h3>Find your perfect match for your Next Project from 1000+ Developers</h3>
                <form className='Login-form'>
                    <div className="email">
                        <input type="email" className="emialInput" id="email" placeholder="Email"/>
                    </div>
                    <div className="password">
                        <input type="password" className="passwordInput" id="password" placeholder="Password"/>
                    </div>
                    <button className='login-btn'>
                        <h4 style={{margin:"0",fontWeight:"500"}}>Login to Your Account</h4>
                        <AiOutlineArrowRight size={23}/>
                    </button>
                <Link to={"/signup"} style={{textDecoration:"none"}}><h6>Don't have an Account?</h6></Link>
                </form>
            </div>
        </main>
      </>
  );
}

export default Login;
