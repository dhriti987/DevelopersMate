import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/home/CreatePostSection.css";
import { BsFillImageFill } from "react-icons/bs";
import Button from "../Button";
import banner from "../../assets/profile/bannerBg.jpg";
import { Link } from "react-router-dom";
import CloseButton from "../CloseButton";
import CoverBackground from "../CoverBackground";
import api from "../../api/ImageApi"

function CreatePostSection() {
  const [createPostDetails, setCreatePostDetails] = useState({
    text: "",
    image: null,
  });
  const navigate = useNavigate();
  let formData = new FormData();
  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("posted_by",localStorage.getItem("userId"))
    formData.append("text",createPostDetails.text);
    formData.append("image",createPostDetails.image ? createPostDetails.image : null);
    try{
      const response = await api.post("post-details/posts/",formData);
      navigate("/home")
    }
    catch(err){
      console.log(err.message)
    } 
  };

  return (
    <>
      <CoverBackground />
      <form className="createPostContainer popUp" onSubmit={onSubmit}>
        <div className="heading">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <CloseButton />
          </Link>
          <h1>Create Post</h1>
        </div>
        <textarea
          name="createPost"
          className="postContent"
          placeholder="What's in your mind?"
          value={createPostDetails.text}
          onChange={(e) => {
            setCreatePostDetails({
              ...createPostDetails,
              text: e.target.value,
            });
          }}
        />
        {createPostDetails.image && (
          <img src={URL.createObjectURL(createPostDetails.image)} alt="" className="createPostImg" />
        )}
        <div className="createPostControl">
          <input
            type="file"
            name="postImg"
            accept="image/*"
            onChange={(e) => {
              setCreatePostDetails({
                ...createPostDetails,
                image: e.target.files[0],
              });
            }}
          />
          <BsFillImageFill
            size={34}
            color="white"
            style={{ cursor: "pointer" }}
          />
          <Button title="Post" width={"8rem"} height="2rem" />
        </div>
      </form>
    </>
  );
}

export default CreatePostSection;
