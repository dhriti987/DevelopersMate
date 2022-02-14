import React from "react";
import "../style/SingleDropDown.css"

function SingleDropDown({top,arr,setInput,displayOptions,setDisplayOptions,anyfuntion}) {
  const handleClick=(e,item)=>{
    setInput(e.target.textContent);
    setDisplayOptions(false);
    anyfuntion(e,item);
  }
  return (
    <div
      className={`singleDropDown ${
        displayOptions
          ? "displayOptions"
          : "hideOptions"
      } `}
      style={{top:top}} 
    >
      {arr.map((item, idx) => {
        return (
          <h4
            key={`employ${idx}`}
            onClick={(e) => handleClick(e,item)}
          >
            {item}
          </h4>
        );
      })}
    </div>
  );
}

export default SingleDropDown;
