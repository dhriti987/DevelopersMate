import React from 'react'
import "../style/ErrorPopUp.css";
import close from "../assets/profile/close.png";
function ErrorPopUp({error,display}) {
  return (
    <div className={`errorPopUpContainer ${display}`}>
      <img src={close} alt="" />
        <h3 >{error}</h3>
    </div>
  )
}

export default ErrorPopUp