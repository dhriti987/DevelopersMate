// import axios from "axios";
import { useState, React } from "react";
import "../style/DoubleDropDown.css";

function DoubleDropDown({
  arr1,
  arr2,
  top,
  // displayLeft,
  // displayRight,
  display,
  // setLeftInput,
  // setRightInput,
  setDisplay,
  // setDisplayLeft,
  // setDisplayRight,
  input,
  setInput
}) {
  return (
    <div className="doubleDropDown-container">
      <div
        className={`fullheight ${display[0] ? "fullheight" : "zeroHeight"}`}
        style={{ top: `${top}` }}
      >
        {arr1.map((item, idx) => {
          return (
            <h4
              key={`years${idx}`}
              onClick={(e) => {
                const newInput=[...input]
                newInput[0]=e.target.textContent;
                setInput(newInput)
                setDisplay([false,false])
              }}
            >
              {item}
            </h4>
          );
        })}
      </div>

      <div
        className={` right ${display[1] ? "fullheight" : "zeroHeight"}`}
        style={{ top: `${top}` }}
      >
        {arr2.map((item, idx) => {
          return (
            <h4
              key={`years${idx}`}
              onClick={(e) => {
                const newInput=[...input]
                newInput[1]=e.target.textContent;
                setInput(newInput)
                setDisplay([false,false])
              }}
            >
              {item}
            </h4>
          );
        })}
      </div>
    </div>
  );
}

export default DoubleDropDown;
