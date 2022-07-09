import React from 'react'
import "../style/DisplayOnlyOnDesktop.css";
import confusion from "../assets/common/confusion.jpeg";

function DisplayOnlyOnDesktop() {
  return (
    <div className='displayOnlyOnDesktopContainer'>
        <div className="displayOnlyOnDesktopContainerImg">
            <img src={confusion} alt="" />
        </div>
        <h1>Use Desktop version for better user experience</h1>
    </div>
  )
}

export default DisplayOnlyOnDesktop