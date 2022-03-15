import React, { useEffect, useState } from "react";
import ShowPost from "../home/ShowPost";
import { useGetRequestMutation } from "../../redux/PrivateApi";
import { Link } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";

function EditPosts() {
  const [getUserPost] = useGetRequestMutation();
  const [userPosts, setUserPosts] = useState(null);
  const otherUserId = useSelector((state) => state.otherUserId.value);
  useEffect( () => {
    let cancel = false;
    getUserPost(
      `post-details/posts/?id=${
        otherUserId ? otherUserId : localStorage.getItem("userId")
      }`
    )
      .unwrap()
      .then((payload) => {
        if(cancel) return 
        setUserPosts(payload);
      });
    return () => {
      cancel = true; 
    };
  }, []);

  return (
    <main className="editPostsContainer commonBox">
      <div className="head">
        <h1>Recent Posts</h1>
        {!otherUserId && (
          <Link to="/showAllPost">
            <BiPencil
              color="white"
              size={28}
              style={{ cursor: "pointer" }}
              className="icon"
            />
          </Link>
        )}
      </div>
      {userPosts && (
        <>
          <div className="postsContainer">
            {userPosts.map((item, idx) => {
              if (idx >= 2) return;
              return (
                <ShowPost item={item} isEdit={true} key={`recentPost${idx}`} />
              );
            })}
          </div>
        </>
      )}
      {userPosts && userPosts.length >= 3 && (
        <Link to="/showAllPost" className="showMoreArrow">
          <AiOutlineDown
            style={{ cursor: "pointer" }}
            color="white"
            size={25}
          />
        </Link>
      )}
    </main>
  );
}

export default EditPosts;
