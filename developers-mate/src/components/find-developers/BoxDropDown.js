import React, { useEffect, useState } from "react";
import "../../style/find-developers/BoxDropDown.css";
import { IoIosClose } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

function BoxDropDown({ dropDownItems }) {
  const [tmpDropDownItem, setTmpDropDownItem] = useState(dropDownItems);
  const [listItems, setListItems] = useState([]);
  const [changedInput, setChangedInput] = useState("");
  const [displayDropDown, setDisplayDropDown] = useState(false);
  const [display,setDisplay] = useState(true);

  useEffect(() => {
    const newTmpDropDownItem = dropDownItems.filter((item) =>
      item.toLowerCase().includes(changedInput.toLowerCase())
    );
    setTmpDropDownItem(newTmpDropDownItem)
    setDisplayDropDown((changedInput.length && display) ? true : false);
    setDisplay(true);
  }, [changedInput]);

  const handleItemClick = (item) => {
    const x = [...listItems, item];
    setListItems(x);
    setChangedInput("");
    setDisplayDropDown(false);
    setDisplay(false);
  };

  const handleDeleteItem = (val) => {
    const deletedArray = listItems.filter((item) => item != val);
    setListItems(deletedArray);
  };

  return (
    <div className="BoxDropDown">
      <h3 style={{ margin: "0", color: "rgba(243, 243, 243, 0.8)" }}>Skills</h3>
      <ul
        className="BoxDropDownContainer"
        style={
          displayDropDown
            ? { borderRadius: "0.5rem 0.5rem 0 0" }
            : { borderRadius: "0.5rem" }
        }
      >
        {listItems.map((item, idx) => {
          return (
            <li className="BoxDropDownChild" key={`boxItem${idx}`}>
              <h4>{item}</h4>
              <IoIosClose
                size={21}
                color="white"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteItem(item)}
              />
            </li>
          );
        })}
        <li className="BoxDropDownChild">
          <input
            type="text"
            className="boxDownInput"
            onChange={(e) => {
              setChangedInput(e.target.value);
            }}
            value={changedInput}
            style={{ width: "5rem", height: "1.5rem" }}
            placeholder="e.g. React"
          />
          <AiOutlinePlus
            size={18}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={() => handleItemClick(changedInput)}
          />
        </li>
      </ul>
      <ul
        className="dropDown"
        style={
          !displayDropDown
            ? { height: "0", padding: "0" }
            : tmpDropDownItem.length >= 5
            ? { height: "11rem" }
            : { height: "auto" }
        }
      >
        {tmpDropDownItem.map((item, idx) => {
          return (
            <li
              className="DropDownItem"
              key={`BoxDropDown${idx}`}
              onClick={(e) => handleItemClick(item)}
            >
              <h3>{item}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BoxDropDown;
