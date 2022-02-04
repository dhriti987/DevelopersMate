import React from 'react';
import "../style/Login.css"
import { AiOutlineArrowRight } from 'react-icons/ai';
import Navbar from '../components/Navbar';
import {Link} from 'react-router-dom'


function SignUp() {
  return (
    <>
    <Navbar title={"Login"}/>
    <main className='loginPage'>
        <div className='Login-container'>

        <h1 >SignUp</h1>
        <h3>Find your perfect match for your Next Project from 1000+ Developers around the world</h3>
            <form className='Login-form'>
                <div className="email">
                    <input type="email" className="emialInput" id="email" placeholder="Email"/>
                </div>
                <div className="name">
                    <input type="text" className="nameInput" id="name" placeholder="UserName"/>
                </div>
                <div className="password">
                    <input type="password" className="passwordInput" id="password" placeholder="Password"/>
                </div>
                <div className="confirmPassword">
                    <input type="password" className="confirmPasswordInput" id="confirmPassword" placeholder="Confirm Password"/>
                </div>
                <button className='login-btn'>
                    <h4 style={{margin:"0",fontWeight:"500"}}>SignUp</h4>
                    <AiOutlineArrowRight size={23}/>
                </button>
            <Link to={"/login"} style={{textDecoration:"none"}}><h6>Already have an Account?</h6></Link>
            </form>
        </div>
    </main>
  </>
  )
}

export default SignUp;
