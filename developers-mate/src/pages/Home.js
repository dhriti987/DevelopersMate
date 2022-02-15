import React from "react";
import "../style/home/Home.css";
import PrivateNavbar from "../components/PrivateNavbar";
import Banner from "../components/home/Banner";
import AddPost from "../components/home/AddPost";
import ShowPost from "../components/home/ShowPost";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <PrivateNavbar />
      <Outlet/>
      <main className="home-page">
        <div className="leftContainer">
          <Banner/>
          <AddPost/>
          <div className="postContainer">
            <ShowPost/>
            <ShowPost/>
            <ShowPost/>
            <ShowPost/>
          </div>
        </div>
        <div className="rightContainer"></div>
      </main>
    </>
  );
}

export default Home;
