import { React, useEffect, useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import { useParams, useNavigate, useOutletContext,Link } from "react-router-dom";
import CloseButton from "../CloseButton";
import {
  usePatchRequestMutation,
  useGetRequestMutation,
} from "../../redux/PrivateApi";
import api from "../../api/ImageApi";
import WarningPopUp from "../WarningPopUp";
import CoverBackground from "../CoverBackground";
import { useSelector } from "react-redux";


function EditPost() {
  let formData = new FormData();
  const otherUserId = useSelector((state)=>state.otherUserId.value);
  const { postId } = useParams();
  const [fetchAgain, setFetchAgain] = useOutletContext();
  const [postContent, setPostContent] = useState(null);
  const navigate = useNavigate();
  const [imageName, setImageName] = useState("");
  const [isImageChanged, setImageChanged] = useState(false);

  const [getPost] = useGetRequestMutation();
  useEffect(() => {
    getPost(`post-details/posts/${postId}`)
      .unwrap()
      .then((payload) => {
        setPostContent(payload);
        setImageName(
          payload.image ? payload.image.split("/").slice(-1) : "Select Image"
        );
      });
  }, []);

  useEffect(()=>{
    if(otherUserId){
      navigate("/showallpost");
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("text", postContent.text);
    if (isImageChanged) formData.append("image", postContent.image);
    try {
      const response = await api.patch(
        `/post-details/posts/${postId}`,
        formData
      );
      setFetchAgain(fetchAgain ? false : true);
      navigate("/showallpost");
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <>
    <CoverBackground/>
      <main className="popUp-container">
      <Link to="/showallpost" style={{ textDecoration: "none" }}>
          <CloseButton/>
        </Link>
        <h1>Edit Post</h1>
        {postContent && (
          <form className="add-container" onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="What's in your mind?"
              value={postContent.text}
              rows="9"
              onChange={(e) => {
                setPostContent({
                  ...postContent,
                  text: e.target.value,
                });
              }}
            />
            <button className="editImgBtn">
              <MdInsertPhoto size={24} className="icon" />
              <h4 style={{ color: "aliceblue", marginTop: "0.5rem" }}>
                {imageName}
              </h4>
              <input
                type="file"
                name="postImage"
                accept="image/png, image/gif, image/jpeg"
                style={{ opacity: "0" }}
                onChange={(e) => {
                  setImageName(e.target.files[0].name);
                  setPostContent({
                    ...postContent,
                    image: e.target.files[0],
                  });
                  setImageChanged(true);
                }}
              />
            </button>
            <div className="nextBtn-container nextBtnEdu">
              <button className="nextbtn" type="submit">
                <h4 style={{ margin: "0" }}>{"Edit"}</h4>
              </button>
            </div>
          </form>
        )}
      </main>
    </>
  );
}

export default EditPost;
