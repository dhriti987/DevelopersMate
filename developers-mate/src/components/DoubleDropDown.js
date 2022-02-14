import axios from "axios";
import { useState, React } from "react";
import "../style/DoubleDropDown.css";

function DoubleDropDown({
  arr1,
  arr2,
  top,
  displayLeft,
  displayRight,
  setLeftInput,
  setRightInput,
  setDisplayLeft,
  setDisplayRight,
}) {
  return (
    <div className="doubleDropDown-container">
      <div
        className={`fullheight ${displayLeft ? "fullheight" : "zeroHeight"}`}
        style={{ top: `${top}` }}
      >
        {arr1.map((item, idx) => {
          return (
            <h4
              key={`years${idx}`}
              onClick={(e) => {
                setLeftInput(e.target.textContent);
                setDisplayLeft(false);
              }}
            >
              {item}
            </h4>
          );
        })}
      </div>

      <div
        className={` right ${displayRight ? "fullheight" : "zeroHeight"}`}
        style={{ top: `${top}` }}
      >
        {arr2.map((item, idx) => {
          return (
            <h4
              key={`years${idx}`}
              onClick={(e) => {
                setRightInput(e.target.textContent);
                setDisplayRight(false);
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
