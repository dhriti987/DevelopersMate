import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdInsertPhoto } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/ImageApi";
import { setUserDetails } from "../../redux/UserDetails";
import CoverBackground from "../CoverBackground";
import CloseButton from "../CloseButton";
import ApiLoading from "../ApiLoading";

function EditBanner() {
  let formData = new FormData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails.value);
  const [loading,setLoading] = useState(null);
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
  const handleDelete=async()=>{
    try {
      setLoading(true);
      const response = await api.patch("profile/profile/", {banner:null});
      setLoading(false);
      dispatch(setUserDetails(response.data));
      navigate("/profile");
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if(imageBannerName.banner===null) navigate("/profile")
    formData.append("banner", imageBannerName.banner);
    try {
      setLoading(true);
      const response = await api.patch("profile/profile/", formData);
      setLoading(false);
      dispatch(setUserDetails(response.data));
      navigate("/profile");
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };
  return (
    <>
    <CoverBackground/>
    {
      loading && 
      <ApiLoading/>
    }
      <main
        className="popUp-container"
        style={{ height: "14rem", overflow: "hidden" }}
      >
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <CloseButton/>
        </Link>
        <h1 style={{ textAlign: "center" }}>Edit Bannner</h1>
        <form className="add-container" onSubmit={onSubmit}>
          <button className="editImgBtn">
            <MdInsertPhoto size={24} className="icon" />
            <h4 style={{ color: "aliceblue"}}>
              {imageBannerName.banner
                ? imageBannerName.banner.name
                : "Edit Banner Image"}
            </h4>
            <input
              type="file"
              name="banner"
              accept="image/png, image/gif, image/jpeg"
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
            <button className="nextbtn" type="submit" onClick={handleDelete}>
              <h4 style={{ margin: "0" }}>Delete Banner</h4>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default EditBanner;
