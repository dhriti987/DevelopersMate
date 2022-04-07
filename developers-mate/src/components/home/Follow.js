import React, { useEffect, useState } from "react";
import PrivateNavbar from "../PrivateNavbar";
import "../../style/home/Follow.css";
import profile from "../../assets/home/banner.jpg";
import { Link } from "react-router-dom";
import { useGetRequestMutation } from "../../redux/PrivateApi";
import {useDispatch} from "react-redux";
import {setOtherUserId} from "../../redux/OtherUserId";

function Follow() {
  const [followList, setFollowList] = useState(null);
  const isFollowers = window.location.href.split("/").slice(-1)[0] === "followers" ? true : false;
  const [getFollow] = useGetRequestMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFollowers) {
      getFollow("profile/followers/").then((payload) => {
        setFollowList(payload.data);
      });
    } else {
      getFollow("profile/followers?following=true").then((payload) => {
        setFollowList(payload.data);
      });
    }
  }, []);

  return (
    <>
      <PrivateNavbar />
      
      <main className="postDetailsView">
        <h1>{isFollowers ? "Followers" : "Following"}</h1>
        {followList &&
          (followList.length === 0 ? (
            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>
              You aren’t {isFollowers ? "followed by" : "following"} anybody.
            </h3>
          ) : (
            followList.map((item, idx) => {
              return (
                <Link
                  to="/profile"
                  className="followContainer"
                  key={`follow${idx}`}
                  onClick = {()=>{dispatch(setOtherUserId(isFollowers ? item.profile : item.following_profile))}}
                >
                  <img src={`http://127.0.0.1:8000${item.image}`} alt="" />
                  <div className="text">
                    <h3>{item.name}</h3>
                    <h5>{item.headline}</h5>
                  </div>
                </Link>
              );
            })
          ))}
      </main>
    </>
  );
}

export default Follow;
