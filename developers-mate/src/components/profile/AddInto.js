import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdInsertPhoto } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { usePatchRequestMutation } from "../../redux/PrivateApi";
import { setUserDetails } from "../../redux/UserDetails";
import api from "../../api/ImageApi";
import CoverBackground from "../../components/CoverBackground";
import CloseButton from "../CloseButton";
import ApiLoading from "../ApiLoading";

function AddInto() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formData = new FormData();
  const userDetails = useSelector((state) => state.userDetails.value);
  const otherUserId = useSelector((state)=>state.otherUserId.value)
  const [loading,setLoading] = useState(null);
  useEffect(() => {
    if (userDetails == null || userDetails == undefined) navigate("/profile");
  }, []);

  const [introObj, setIntroObj] = useState({
    headline: userDetails && userDetails.headline,
    firstName: userDetails && userDetails.first_name,
    lastName: userDetails && userDetails.last_name,
  });
  const [imageObj, setImageObj] = useState({
    image: userDetails && userDetails.image.split("/").pop(),
    imageUrl: null,
  });
  const isAdd = window.location.href.includes("add");

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("headline", introObj.headline);
    formData.append("first_name", introObj.firstName);
    formData.append("last_name", introObj.lastName);
    if (imageObj.imageUrl) formData.append("image", imageObj.imageUrl);
    try {
      setLoading(true);
      const response = await api.patch("profile/profile/", formData);
      setLoading(false);
      dispatch(setUserDetails(response.data));
      navigate("/profile");
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      <CoverBackground />
      {
        loading && 
        <ApiLoading/>
      }
      {userDetails && (
        <main
          className="popUp-container"
          style={{ height: "auto", paddingBottom: "1rem", overflow: "hidden" }}
        >
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <CloseButton />
          </Link>
          <h1 style={{ textAlign: "center" }}>
            {isAdd ? "Add" : "Edit"} Introduction
          </h1>
          <form className={`add-container`} onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Headline"
              value={introObj.headline}
              onChange={(e) => {
                setIntroObj({
                  ...introObj,
                  headline: e.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="First Name"
              value={introObj.firstName}
              onChange={(e) => {
                setIntroObj({
                  ...introObj,
                  firstName: e.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={introObj.lastName}
              onChange={(e) => {
                setIntroObj({
                  ...introObj,
                  lastName: e.target.value,
                });
              }}
            />
            {!otherUserId && 
            <button className="editImgBtn">
              <MdInsertPhoto size={24} className="icon" />
              <h4 style={{ color: "aliceblue" }}>
                {imageObj.image}
              </h4>
              <input
                type="file"
                name="banner"
                accept="image/png, image/jpeg"
                style={{ opacity: "0" }}
                onChange={(e) => {
                  setImageObj({
                    image: e.target.files[0].name,
                    imageUrl: e.target.files[0],
                  });
                }}
              />
            </button>
            }
            <div className="nextBtn-container nextBtnEdu">
              <button className="nextbtn" type="submit">
                <h4 style={{ margin: "0" }}>{isAdd ? "Add" : "Edit"}</h4>
              </button>
            </div>
          </form>
        </main>
      )}
    </>
  );
}

export default AddInto;
