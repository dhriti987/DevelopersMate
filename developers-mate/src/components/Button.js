import React from 'react'
import "../style/Button.css";

function Button({title,styles}) {
  return (
    <button className='btn' style={styles}>
        <h4>{title}</h4>    
    </button>
  )
}

export default Button