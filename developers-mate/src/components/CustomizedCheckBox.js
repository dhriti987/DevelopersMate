import {React,useState} from 'react';
import "../style/CustomizedCheckBox.css";

function CustomizedCheckBox({setIsChecked,isChecked}) {
  return (
      <main className='CustomizedCheckBox-container'>
          <div className={`checkBox ${isChecked ? "checked" : "unChecked"}`}onClick={()=>{setIsChecked(isChecked ? false : true)}}>

          </div>
          <h4>I am Currently Working in this role.</h4>
      </main>
  )
}

export default CustomizedCheckBox;
