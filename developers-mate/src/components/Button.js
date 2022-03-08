import React from 'react'
import "../style/Button.css";

function Button({title,width,height}) {
  return (
    <button className='btn' style={{width:`${width}`,height:`${height}`}}>
        <h4>{title}</h4>    
    </button>
  )
}

export default Button