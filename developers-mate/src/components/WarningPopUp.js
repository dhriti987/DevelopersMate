import React from 'react'
import "../style/WarningPopUp.css"
import warningImg from "../assets/profile/warning.png"

function WarningPopUp({display,setDisplayWarning,setIsDeleted,heading}) {
  return (
    <div className='warningPopUpContainer' style={display ? {opacity:"1",zIndex:"1000"} : {opacity:"0",zIndex:"-10"}}>
        <img src={warningImg} alt="" />
        <h2>{`${heading}`}</h2>
        <div className='warningBtn'>
        <button onClick={()=>{
          setIsDeleted(true)
          setDisplayWarning(false)
          }}>
            <h3>Yes</h3>
        </button>
        <button onClick={()=>{
          setIsDeleted(false)
          setDisplayWarning(false)
        }}>
            <h3>No thanks</h3>
        </button>

        </div>
    </div>
  )
}

export default WarningPopUp