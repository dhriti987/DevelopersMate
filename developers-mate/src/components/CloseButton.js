import React from 'react'
import "../style/CloseButton.css";
import { ImCross } from "react-icons/im";

function CloseButton() {
  return (
    <ImCross size={23} color="white" className="cancelIcon" />
  )
}

export default CloseButton