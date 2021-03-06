import { React, useState, useEffect } from "react";
import "../../style/home/ShowComment.css";
import LikeButton from "../LikeButton";
import { AiOutlineShareAlt } from "react-icons/ai";
import ProfileHead from "./ProfileHead";
import CommentSection from "./CommentSection";
import {  useParams } from "react-router-dom";
import { useGetRequestMutation,usePostRequestMutation } from "../../redux/PrivateApi";
import PrivateNavbar from "../PrivateNavbar";
import ApiLoading from "../ApiLoading";

function PostDetailPopUp() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [submitComment,setSubmitComment] = useState("");
  const [getPostDetails] = useGetRequestMutation();
  const [fetchAgain,setFetchAgain] = useState(true)
  const [postApi,postReponse] = usePostRequestMutation();
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
    await postApi({data:data,url:`post-details/comments/`})
    .unwrap()
    .then((payload)=>{
      setFetchAgain(fetchAgain ? false :true);
      setSubmitComment("");
    })
  }

  return (
    <>
    {postReponse.isLoading && 
      <ApiLoading/>
    }
      <PrivateNavbar />
      {postDetails && 
        <main className="postDetailsView">
          <ProfileHead item={postDetails} />
          <div className="postDetailsImage">
            {postDetails.image ? 
            <img src={`${postDetails.image}`} alt="" />
            :
            <></>
            }
          </div>
            
            <div className="body" style={{marginTop:"1rem"}}>
              <h4 style={{ fontWeight: "500" }}>
                {postDetails.text}
              </h4>
            </div>
            <div className="icons">
              <LikeButton item={postDetails}/>
              
              <AiOutlineShareAlt
                size={31}
                color="rgba(243, 243, 243, 0.8)"
                style={{ cursor: "pointer" }}
              />
            </div>
            <form className="userComment" onSubmit={handleCommentSubmit}>
              <textarea type="text" placeholder="Comment" value={submitComment} onChange={(e)=>{setSubmitComment(e.target.value)}} required/>
              <button type="submit">Comment</button>
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
        </main>
      }
    </>
  );
}

export default PostDetailPopUp;
