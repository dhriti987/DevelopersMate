import { React, useEffect, useState } from "react";
import "../../style/home/AddPost.css";
import { BiPencil } from "react-icons/bi";
import { useGetRequestMutation } from "../../redux/PrivateApi";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/profile/default.jpg";

function AddPost() {
  const [getUserDetails, responseInfo] = useGetRequestMutation();
  const [userProfilePic, setUserProfilePic] = useState(null);
  useEffect(async () => {
    await getUserDetails("profile/profile/")
      .unwrap()
      .then((payload) => {
        setUserProfilePic(payload.image);
      });
  }, []);
  return (
    <div className="addPost">
      <div className="head">
        <BiPencil size={23} color="rgba(243, 243, 243, 0.8)" />
        <h3
          style={{
            marginTop: "0.5rem",
            fontWeight: "500",
            color: "rgba(16, 202, 0, 0.7)",
          }}
        >
          Create Post
        </h3>
      </div>
      <div className="createPostBtn">
        <img
          src={`${userProfilePic}`}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = defaultImg;
          }}
        />
        <Link to="createpost/">
          <button>
            <h3 style={{ fontWeight: "300" }}>Create Post...</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AddPost;
