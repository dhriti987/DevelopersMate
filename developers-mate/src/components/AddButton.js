import React from 'react'
import "../style/AddButton.css";
import {Link} from "react-router-dom";
import { BsPlusLg } from 'react-icons/bs';


function AddButton({to}) {
  return (
    <Link to={to} style={{textDecoration:"none"}}>
        <button className="addBtn">
            <h2 >Add</h2>
            <BsPlusLg size={16}/>
        </button>
    </Link>
  )
}

export default AddButton