import React, { useEffect, useState } from "react";
import "../style/home/Home.css";
import PrivateNavbar from "../components/PrivateNavbar";
import Banner from "../components/home/Banner";
import AddPost from "../components/home/AddPost";
import ShowPost from "../components/home/ShowPost";
import { Outlet } from "react-router-dom";
import { useGetRequestMutation } from "../redux/PrivateApi";
import { useDispatch } from "react-redux";
import { setOtherUserId } from "../redux/OtherUserId";
import Spinner from "../assets/common/Spinner.gif";
import {useSelector} from "react-redux";

function Home() {
  const [getPosts, responseInfo] = useGetRequestMutation();
  const [allPosts, setAllPosts] = useState(null);
  const fetchPost = useSelector((state)=>state.fetchPost.value);
  const [fetchAgain,setFetchAgain] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    getPosts("post-details/posts/")
      .unwrap()
      .then((payload) => {
        setAllPosts(payload);
      });
  }, [fetchAgain]);
  useEffect(()=>{
    dispatch(setOtherUserId(null));
  },[])
  return (
    <>
      <PrivateNavbar />
      <Outlet context={[fetchAgain, setFetchAgain]}/>
      <main className="home-page">
        <div className="leftContainer">
          <Banner />
          <AddPost />
          {allPosts ? (
            <div className="postContainer">
              {
                allPosts.map((item,idx)=>{
                  return(<ShowPost item={item} key={idx} isEdit={false}/>)
                })
              }

            </div>
          ) : (
            <img src={Spinner} alt="" style={{background:"inherit"}}/>
          )}
        </div>
        <div className="rightContainer"></div>
      </main>
    </>
  );
}

export default Home;
