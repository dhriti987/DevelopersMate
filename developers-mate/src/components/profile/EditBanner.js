import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdInsertPhoto } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/ImageApi";
import {setUserDetails} from "../../redux/UserDetails";
import CoverBackground from "../CoverBackground";

function EditBanner() {
  let formData = new FormData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails.value);
  const [imageBannerName, setImageBannerName] = useState({
    banner: null,
  });
    useEffect(() => {
      if (userDetails === null || userDetails === undefined) {
        navigate("/profile");
      }
    }, []);
  const handleChange = (e) => {
    setImageBannerName({ ...imageBannerName, banner: e.target.files[0] });
  };
  const onSubmit = async (e) => {
      e.preventDefault();
    formData.append("banner", imageBannerName.banner);
    try{
        const response = await api.patch("profile/profile/", formData)
        dispatch(setUserDetails(response.data));
        navigate("/profile")
    }
    catch(err){
        console.log(err.response)
    }
  };
  return (
    <>
    <CoverBackground/>
    <main
      className="popUp-container"
      style={{ height: "14rem", overflow: "hidden" }}
    >
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ImCross size={23} color="white" className="cancelIcon" />
      </Link>
      <h1 style={{ textAlign: "center" }}>Edit Bannner</h1>
      <form className="add-container" onSubmit={onSubmit}>
        <button className="editImgBtn">
          <MdInsertPhoto size={24} className="icon" />
          <h4 style={{ color: "aliceblue", marginTop: "0.5rem" }}>
            {imageBannerName.banner
              ? imageBannerName.banner.name
              : "Edit Banner Image"}
          </h4>
          <input
            type="file"
            name="banner"
            accept="image/*"
            style={{ opacity: "0" }}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </button>
        <div className="nextBtn-container nextBtnEdu">
          <button className="nextbtn" type="submit">
            <h4 style={{ margin: "0" }}>Edit</h4>
          </button>
          <button className="nextbtn" type="submit">
            <h4 style={{ margin: "0" }}>Delete Banner</h4>
          </button>
        </div>
      </form>
    </main>
    </>
  );
}

export default EditBanner;
