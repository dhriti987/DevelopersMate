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
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function Home() {
  const [getPosts, responseInfo] = useGetRequestMutation();
  const [allPosts, setAllPosts] = useState(null);
  const fetchPost = useSelector((state) => state.fetchPost.value);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [news, setNews] = useState(null);
  const [collapse, setCollapse] = useState(false);
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
      setNews(res);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const timeConverter = (publishedOn) => {
    let then = new Date(Date.parse(publishedOn));
    then.toLocaleString();
    let now = new Date();
    let totalMonths =
      (now.getFullYear() - then.getFullYear()) * 12 +
      (now.getMonth() - then.getMonth());
    let interval = now - then;
    // console.log(interval);
    if (totalMonths > 12)
      return totalMonths < 24
        ? "1 year ago"
        : `${parseInt(totalMonths / 12)} years ago`;
    else if (totalMonths >= 1)
      return totalMonths == 1 ? "1 month ago" : `${totalMonths} months ago`;
    else if (parseInt(interval / (1000 * 60 * 60 * 24))) {
      const days = parseInt(interval / (1000 * 60 * 60 * 24));
      return days == 1 ? "1 day ago" : `${days} days ago`;
    } else if (parseInt(interval / 1000) >= 3600) {
      const hours = parseInt(interval / 1000 / 3600);
      return hours == 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (parseInt(interval / 1000) >= 60) {
      const min = parseInt(interval / 1000 / 60);
      return min == 1 ? "1 minutes ago" : `${min} minutes ago`;
    }
    return parseInt(interval / 1000)
      ? "a sec ago"
      : `${parseInt(interval / 1000)} sec ago`;
  };

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
            <img
              src={Spinner}
              alt=""
              style={{ display: "block", margin: "auto" }}
            />
          )}
        </div>
        <div className="rightContainer">
          <Link to="/finddevelopers" style={{ textDecoration: "none" }}>
            <Button
              title="Find Developer that best suits for your Project"
              styles={{ width: "100%", height: "5rem", margin: "0" }}
            />
          </Link>
          <div className="newsContainer">
            <h2>Technology News</h2>
            {!news && (
              <img
                src={Spinner}
                alt=""
                style={{
                  display: "block",
                  margin: "auto",
                  background: "inherit",
                }}
              />
            )}
            {news && (
              <ul
                className="newsList"
                style={collapse ? { height: "auto" } : { height: "21rem" }}
              >
                {news.data.articles.map((item, idx) => {
                  return (
                    <a
                      href={`${item.url}`}
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      key={`news1${idx}`}
                    >
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
                          {timeConverter(item.publishedAt)}
                        </h6>
                      </li>
                    </a>
                  );
                })}
              </ul>
            )}
            {collapse ? (
              <AiOutlineUp
                size={30}
                color="white"
                className="ShowMoreIcon"
                onClick={() => {
                  setCollapse(!collapse);
                }}
              />
            ) : (
              <AiOutlineDown
                size={30}
                color="white"
                className="ShowMoreIcon"
                onClick={() => {
                  setCollapse(!collapse);
                }}
              />
            )}
            {/* <AiOutlineDown size={30} color="white" className="ShowMoreIcon" onClick={()=>{setCollapse(!collapse)}}/> */}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
