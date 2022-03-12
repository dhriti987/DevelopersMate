import React, { useEffect, useState } from "react";
import "../style/home/Home.css";
import PrivateNavbar from "../components/PrivateNavbar";
import Banner from "../components/home/Banner";
import AddPost from "../components/home/AddPost";
import ShowPost from "../components/home/ShowPost";
import { Outlet } from "react-router-dom";
import { useGetRequestMutation } from "../redux/PrivateApi";
import Spinner from "../assets/common/Spinner.gif";

function Home() {
  const [getPosts, responseInfo] = useGetRequestMutation();
  const [allPosts, setAllPosts] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(async () => {
    getPosts("post-details/posts/")
      .unwrap()
      .then((payload) => {
        setAllPosts(payload);
      });
  }, [loading]);

  return (
    <>
      <PrivateNavbar />
      <Outlet context={[loading,setLoading]}/>
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
