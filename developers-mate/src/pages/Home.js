import React, { useEffect, useState } from "react";
import "../style/home/Home.css";
import PrivateNavbar from "../components/PrivateNavbar";
import Banner from "../components/home/Banner";
import AddPost from "../components/home/AddPost";
import ShowPost from "../components/home/ShowPost";
import { Outlet, Link } from "react-router-dom";
import { useGetRequestMutation } from "../redux/PrivateApi";
import { useDispatch } from "react-redux";
import { setOtherUserId } from "../redux/OtherUserId";
import Spinner from "../assets/common/Spinner.gif";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import axios from "axios";
import { AiOutlineDown,AiOutlineUp } from 'react-icons/ai';

function Home() {
  const [getPosts, responseInfo] = useGetRequestMutation();
  const [allPosts, setAllPosts] = useState(null);
  const fetchPost = useSelector((state) => state.fetchPost.value);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [news, setNews] = useState(null);
  const [collapse,setCollapse] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    getPosts("post-details/posts/")
      .unwrap()
      .then((payload) => {
        setAllPosts(payload);
      });
  }, [fetchAgain]);
  useEffect(() => {
    dispatch(setOtherUserId(null));
  }, []);

  useEffect(async () => {
    try {
      const res = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=2ae12199a0524b6eaf3d003a874f74c1"
      );
      console.log(res);
      setNews(res);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <>
      <PrivateNavbar />
      <Outlet context={[fetchAgain, setFetchAgain]} />
      <main className="home-page">
        <div className="leftContainer">
          <Banner />
          <AddPost />
          {allPosts ? (
            <div className="postContainer">
              {allPosts.map((item, idx) => {
                return <ShowPost item={item} key={idx} isEdit={false} />;
              })}
            </div>
          ) : (
            <img src={Spinner} alt="" style={{ background: "inherit" }} />
          )}
        </div>
        <div className="rightContainer">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button
              title="Find Developer that best suits for your Project"
              styles={{ width: "100%", height: "5rem", margin: "0" }}
            />
          </Link>
          <div className="newsContainer">
            <h2>Technology News</h2>
            {news && (
              <ul className="newsList" style={collapse ? {height:"auto"} : {height: "21rem"}}>
                {news.data.articles.map((item, idx) => {
                  return (
                    <a href={`${item.url}`} style={{ textDecoration: "none" }} target="_blank" key={`news1${idx}`}>
                      <li style={{ color: "white" }} className="news">
                        <h5 style={{ marginBottom: "0" }}>
                          {item.title.length >= 30
                            ? item.title.slice(0, 30)
                            : item.title}
                          ....
                        </h5>
                        <h6
                          style={{
                            marginTop: "-6px",
                            color: "rgb(181 181 181 / 60%)",
                          }}
                        >
                          5days ago
                        </h6>
                      </li>
                    </a>
                  );
                })}
              </ul>
            )}
            {
              collapse ? 
              <AiOutlineUp size={30} color="white" className="ShowMoreIcon" onClick={()=>{setCollapse(!collapse)}}/> : 
              <AiOutlineDown size={30} color="white" className="ShowMoreIcon" onClick={()=>{setCollapse(!collapse)}}/>
            }
            {/* <AiOutlineDown size={30} color="white" className="ShowMoreIcon" onClick={()=>{setCollapse(!collapse)}}/> */}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
