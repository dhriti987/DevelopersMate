import React from 'react'
import "../../style/home/AddPost.css";
import { BiPencil } from 'react-icons/bi';
import profile from "../../assets/profile/profile.svg";


function AddPost() {
  return (
    <div className='addPost'>
        <div className="head">
            <BiPencil size={23} color="rgba(243, 243, 243, 0.8)"/>
            <h3 style={{marginTop:"0.5rem",fontWeight:"500",color:"rgba(16, 202, 0, 0.7)"}}>Create Post</h3>
        </div>
        <div className="createPostBtn">
            <img src={profile} alt="" />
            <button><h3 style={{fontWeight:"300",}}>Create Post...</h3></button>
        </div>
    </div>
  )
}

export default AddPost