import React, { useEffect, useState } from "react";
import PrivateNavbar from "../PrivateNavbar";
import {
  useGetRequestMutation,
  useDeleteRequestMutation,
} from "../../redux/PrivateApi";
import ShowPost from "../home/ShowPost";
import { Outlet } from "react-router-dom";
import WarningPopUp from "../WarningPopUp";
import CoverBackground from "../../components/CoverBackground";
import Spinner from "../../assets/common/Spinner.gif";

function ShowAllPost() {
  const [getUserPost] = useGetRequestMutation();
  const [deleteUserPost] = useDeleteRequestMutation();
  const [userPost, setUserPosts] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    getUserPost(`post-details/posts/?id=${localStorage.getItem("userId")}`)
      .unwrap()
      .then((payload) => {
        setUserPosts(payload);
      });
  }, [fetchAgain]);

  useEffect(() => {
      console.log("hell")
    if (isDeleted)
      deleteUserPost(`post-details/posts/${selectedPostId}`)
        .unwrap()
        .then((payload) => {
            setIsDeleted(false);
            setFetchAgain(fetchAgain ? false :true)
        });
  }, [isDeleted]);

  return (
    <>
      <PrivateNavbar />
      {displayWarning && 
        <CoverBackground/>
      }
      {!userPost && 
        <img src={Spinner} alt="" style={{position:"absolute",top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"}}/>
      }
      <WarningPopUp
        display={displayWarning}
        setDisplayWarning={setDisplayWarning}
        setIsDeleted={setIsDeleted}
        heading={"Post"}
      />
      <main className="profile-page userPosts">
        <h1 style={{ marginBottom: "1rem" }}>Recent Posts</h1>
        <div className="showPostsContainer">
          {userPost &&
            userPost.map((item, idx) => {
              return (
                <ShowPost
                  item={item}
                  isEdit={true}
                  isPost={true}
                  setDisplayWarning={setDisplayWarning}
                  key={`showAllPosts${idx}`}
                  setSelectedPostId={setSelectedPostId}
                />
              );
            })}
        </div>
      </main>
      <Outlet context={[fetchAgain, setFetchAgain]} />
    </>
  );
}

export default ShowAllPost;
