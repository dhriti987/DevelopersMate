import React, { useEffect, useState } from "react";
import "../../style/find-developers/BoxDropDown.css";
import { IoIosClose } from "react-icons/io";

function BoxDropDown({dropDownItems}) {

  const [tmpDropDownItem , setTmpDropDownItem] = useState(dropDownItems);
  const [changedInput , setChangedInput] = useState("");

  useEffect(()=>{
    const newTmpDropDownItem = tmpDropDownItem.filter((item)=>item.toLowerCase().includes(changedInput.toLowerCase()))
    setTmpDropDownItem(newTmpDropDownItem)
  },[changedInput])

  return (
    <div className="BoxDropDown">
      <h3 style={{margin:"0",color: "rgba(243, 243, 243, 0.8)"}}>Skills</h3>
      <ul className="BoxDropDownContainer">
        <li className="BoxDropDownChild">
          <h4>React</h4>
          <IoIosClose size={21} color="white" style={{ cursor: "pointer" }} />
        </li>
        <li className="BoxDropDownChild">
          <h4>React</h4>
          <IoIosClose size={21} color="white" style={{ cursor: "pointer" }} />
        </li>
        <li className="BoxDropDownChild">
          <h4>ascascascsacascas</h4>
          <IoIosClose size={21} color="white" style={{ cursor: "pointer" }} />
        </li>
        <li className="BoxDropDownChild">
          <h4>React</h4>
          <IoIosClose size={21} color="white" style={{ cursor: "pointer" }} />
        </li>
        <li className="BoxDropDownChild">
          <input type="text" className="boxDownInput" onChange={(e)=>{setChangedInput(e.target.value)}} value={changedInput} />
        </li>
      </ul>
      <ul className="dropDown">
        {
          tmpDropDownItem.map((item,idx)=>{
            return (
              <li className="DropDownItem" key={`BoxDropDown${idx}`}>
                <h3>{item}</h3>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default BoxDropDown;
