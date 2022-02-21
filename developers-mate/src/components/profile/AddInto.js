import { React, useState } from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { MdInsertPhoto } from "react-icons/md";
import axios from "axios";

function AddInto() {
  let formData = new FormData();
  const [imageBannerName, setImageBannerName] = useState({
    banner:null,
    profile:null
  });
  const [heading, setHeading] = useState("");
  const [images,setImages] = useState(null);
  const isAdd = window.location.href.includes("add");

  const handleChange=(e)=>{
    console.log(e.target.files[0].name)
    if(e.target.name==="banner"){
      setImageBannerName({...imageBannerName,banner:e.target.files[0]})
      console.log(imageBannerName)
    }
    else{
      console.log(e.target.name)
      setImageBannerName({...imageBannerName,profile:e.target.files[0]})
    }
  }

  const onSubmit=async()=>{
    formData.append("banner",imageBannerName.banner)
    formData.append("profile",imageBannerName.banner)
  }

  return (
    <main className="popUp-container">
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>
        {isAdd ? "Add" : "Edit"} Introduction
      </h1>
      <form className={`add-container`} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
        />
        <button className="editImgBtn">
          <MdInsertPhoto size={24} className="icon" />
          <h4 style={{ color: "aliceblue", marginTop: "0.5rem" }}>{imageBannerName.banner ? imageBannerName.banner.name : "Edit Banner Image"}</h4>
          <input type="file" name="banner" accept="image/*" style={{ opacity: "0" }} onChange={(e)=>{handleChange(e)}}/>
        </button>
        <button className="editImgBtn">
          <MdInsertPhoto size={24} className="icon" />
          <h4 style={{ color: "aliceblue", marginTop: "0.5rem" }}>{imageBannerName.profile ? imageBannerName.profile.name : "Edit Profile Image"}</h4>
          <input type="file" name="profile" accept="image/*" style={{ opacity: "0" }} onChange={(e)=>{handleChange(e)}}/>
        </button>
        <div className="nextBtn-container nextBtnEdu">
            <button className="nextbtn" type="submit">
              <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
            </button>
        </div>
      </form>
    </main>
  );
}

export default AddInto;
