import {React,useState} from 'react'
import "../style/LikeButton.css"

function LikeButton() {

    const [isLiked,setIsLiked]=useState(false);

  return (
    <div className='heartBtn'>
        <div className="content">
            <div className={`heart ${isLiked ? "liked" : "notLiked"}`} onClick={()=>{isLiked ? setIsLiked(false) : setIsLiked(true)}}></div>
            <div className='Number'><h5 style={{color:"rgb(156 145 145 / 80%)"}}>24</h5></div>
        </div>
    </div>
  )
}

export default LikeButton