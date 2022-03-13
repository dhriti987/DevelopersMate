import { React, useState, useEffect } from "react";
import "../../style/home/popUp.css";
import camera from "../../assets/home/camera.png";
import LikeButton from "../LikeButton";
import { BiCommentDots } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import ProfileHead from "./ProfileHead";
import CommentSection from "./CommentSection";
import { Link, useParams } from "react-router-dom";
import CoverBackground from "../CoverBackground";
import { useGetRequestMutation,usePostRequestMutation } from "../../redux/PrivateApi";

function PostDetailPopUp() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [submitComment,setSubmitComment] = useState("");
  const [getPostDetails] = useGetRequestMutation();
  const [fetchAgain,setFetchAgain] = useState(true)
  const [postApi] = usePostRequestMutation();
  const [commentDetails,setCommentDetails] = useState(null);
  useEffect(async () => {
    getPostDetails(`post-details/posts/${postId}`)
      .unwrap()
      .then((payload) => {
        setPostDetails(payload);
      });
  }, []);
  useEffect(async () => {
    getPostDetails(`post-details/comments/?id=${postId}`)
      .unwrap()
      .then((payload) => {
        setCommentDetails(payload)
      });
  }, [fetchAgain]);

  const handleCommentSubmit=async(e)=>{
    e.preventDefault();
    const data = {
      post:postId,
      text:submitComment,
      user_profile:localStorage.getItem("userId")
    }
    postApi({data:data,url:`post-details/comments/`})
    .unwrap()
    .then((payload)=>{
      setFetchAgain(fetchAgain ? false :true);
      setSubmitComment("");
    })
  }

  return (
    <>
      <CoverBackground />
      {postDetails && 
        <main className="popUp">
          <div className="leftContainer">
            {postDetails.image ? 
            <img src={`${postDetails.image}`} alt="" />
            :
            <>
            <img src={camera} alt="" />
            <h1>No Image Available</h1>
            </>
            }
          </div>
          <div className="rightContainer">
            <Link to="/home">
              <ImCross color="white" size={20} className="cancelBtn" />
            </Link>
            <ProfileHead item={postDetails} />
            <div className="body">
              <h4 style={{ fontWeight: "500" }}>
                {postDetails.text}
              </h4>
            </div>
            <div className="icons">
              <LikeButton />
              <BiCommentDots
                size={31}
                color="rgba(243, 243, 243, 0.8)"
                style={{ cursor: "pointer" }}
              />
              <AiOutlineShareAlt
                size={31}
                color="rgba(243, 243, 243, 0.8)"
                style={{ cursor: "pointer", marginLeft: "1.1rem" }}
              />
            </div>
            <form className="userComment" onSubmit={handleCommentSubmit}>
              <input type="text" placeholder="Comment" value={submitComment} onChange={(e)=>{setSubmitComment(e.target.value)}} required/>
              <button type="submit">Submit</button>
            </form>
            {
              commentDetails && 

              <div className="commentContainer">
                {
                  commentDetails.map((item,idx)=>{
                    return <CommentSection item={item} key={`comment${idx}`}/>
                  })
                }
              </div>
            }
          </div>
        </main>
      }
    </>
  );
}

export default PostDetailPopUp;
