import React from 'react'
import "../style/CoverBackground.css"
import loading from "../assets/common/loading.gif";

function ApiLoading() {
    const styleObj = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        zIndex:"1000"
    }
  return (
    <div className="cover" style={styleObj}>
        <img src={loading} alt="" style={{width:"30px",height:"30px"}}/>
    </div>
  )
}

export default ApiLoading