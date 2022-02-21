import React, { useState } from "react";
import "../../style/profile/CommonAdd.css";
import { Link,useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import {usePatchRequestMutation} from "../../redux/PrivateApi";
import {useSelector,useDispatch} from "react-redux";
import {setUserDetails} from "../../redux/UserDetails";
function AddBio() {

  const [addBio,responseInfo] = usePatchRequestMutation(); 
  const dispatch = useDispatch()
  const navigate=useNavigate();
  const userDetails = useSelector((state)=>state.userDetails.value)
  const isAdd=window.location.href.includes("add");
  const [bio,setBio]= useState(isAdd ? "" : userDetails.bio)

  const handleSubmit=async(e)=>{
    e.preventDefault();
      const data={
        user:localStorage.getItem("userId"),
        bio:bio
      }
      await addBio({data:data,url:"profile/profile/"})
      .unwrap()
      .then((payload)=>{
        dispatch(setUserDetails(payload));
        navigate("/profile")
        
      })
  }

  return (
    <form className="popUp-container" onSubmit={handleSubmit}>
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>{isAdd ? "Add" : "Edit"} Bio</h1>
      <textarea
        name="bio"
        id="Bio"
        rows="20"
        style={{ padding: "1rem 1rem" }}
        value={bio}
        onChange={(e)=>{setBio(e.target.value)}}
      ></textarea>
      <div className="nextBtn-container nextBtnEdu">
          <button className="nextbtn" type="submit">
            <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
          </button>
      </div>
      
    </form>
  );
}

export default AddBio;
