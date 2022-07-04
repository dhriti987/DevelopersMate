import "./App.css";
import Login from "./pages/Login";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AddSkills from "./components/profile/AddSkills";
import Home from "./pages/Home";
import AddEducation from "./components/profile/AddEducation";
import AddUserDetails from "./components/profile/AddUserDetails";
import AddExperience from "./components/profile/AddExperience";
import Profile from "./pages/Profile";
import AddProjects from "./components/profile/AddProjects";
import AddBio from "./components/profile/AddBio";
import AddInto from "./components/profile/AddInto";
import PrivateRoute from "./utils/PrivateRoute";
import PostDetailPopUp from "./components/home/PostDetailPopUp";
import Page404 from "./pages/Page404";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthToken } from "./redux/authTokens";
import { setChatThread } from "./redux/ChatThreads";
import { setUserDetails } from "./redux/UserDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditBanner from "./components/profile/EditBanner";
import CreatePostSection from "./components/home/CreatePostSection";
import ShowAllPost from "./components/profile/ShowAllPost";
import EditPost from "./components/profile/EditPost";
import Follow from "./components/home/Follow";
import FindDevelopers from "./pages/FindDevelopers";
import Chat from "./pages/Chat";
import {
  useGetRequestMutation,
  usePutRequestMutation,
} from "./redux/PrivateApi";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import EmailVerification from "./pages/EmailVerification";
const client = new W3CWebSocket(
  `${process.env.REACT_APP_WEBSOCKET_URL}/chat/?token=${
    localStorage.getItem("access") ? localStorage.getItem("access") : ""
  }`
);

function App() {
  const navigate = useNavigate();
  const [getReq] = useGetRequestMutation();
  const [putReq] = usePutRequestMutation();
  const authToken = useSelector((state) => state.authToken.value);
  const chatThreads = useSelector((state) => state.chatThread.value);
  const currentThread = useSelector((state) => state.currentThread.value);
  const dispatch = useDispatch();
  dispatch(
    setAuthToken(
      localStorage.getItem("access") ? localStorage.getItem("access") : null
    )
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const updateToken = async () => {
        if (authToken) {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/api/token/refresh/`,
              {
                refresh: localStorage.getItem("refresh"),
              }
            );
            dispatch(setAuthToken(response.data));
            localStorage.setItem("access", response.data.access);
          } catch (err) {
            dispatch(setAuthToken(null));
            localStorage.clear();
            navigate("/login");
          }
        }
      };
      updateToken();
    }, 1200000);
    return () => clearInterval(interval);
  }, [authToken]);

  client.onmessage = (val) => {
    const data = JSON.parse(val.data);
    if (Array.isArray(data)) {
      dispatch(setChatThread(data));
    } else {
      let check = false;
      const newChatThread = chatThreads.map((item) => {
        if (item.id == data.thread) {
          check = true;
          return { ...item, messages: [...item.messages, data] };
        } else {
          return item;
        }
      });
      if (check) {
        dispatch(setChatThread(newChatThread));
      } else {
        getReq(`chat/get-thread/${data.sent_by_id}`)
          .unwrap()
          .then((payload) => {
            dispatch(setChatThread([...chatThreads, payload]));
          });
      }
      const idx = chatThreads.findIndex((arrItem) => arrItem.id == data.thread);
      if (
        idx >= 0 &&
        (!currentThread || chatThreads[idx].id != currentThread.id)
      ) {
        if (chatThreads[idx].first_user_id == localStorage.getItem("userId")) {
          const newArrChatThread = [...newChatThread];
          newArrChatThread[idx] = {
            ...newChatThread[idx],
            first_user_seen: false,
          };
          dispatch(setChatThread(newArrChatThread));
        } else {
          const newArrChatThread = [...newChatThread];
          newArrChatThread[idx] = {
            ...newChatThread[idx],
            second_user_seen: false,
          };
          dispatch(setChatThread(newArrChatThread));
        }
      } else if (idx >= 0) {
        putReq(`chat/set-thread-seen/${currentThread.id}`);
      }
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/addUserDetails" element={<AddUserDetails />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route exact path="addskills" element={<AddSkills />} />
            <Route exact path="addexperience" element={<AddExperience />} />
            <Route exact path="addeducation" element={<AddEducation />} />
            <Route exact path="addproject" element={<AddProjects />} />
            <Route exact path="addintro" element={<AddInto />} />
            <Route exact path="addbio" element={<AddBio />} />
            <Route exact path="editbio" element={<AddBio />} />
            <Route
              exact
              path="editexperience/:id"
              element={<AddExperience />}
            />
            <Route exact path="editeducation/:id" element={<AddEducation />} />
            <Route exact path="editproject/:id" element={<AddProjects />} />
            <Route exact path="editintro" element={<AddInto />} />
            <Route exact path="editbanner" element={<EditBanner />} />
          </Route>
          <Route path="chat" element={<Chat client={client} />} />
          <Route path="showallpost" element={<ShowAllPost />}>
            <Route exact path="editpost/:postId" element={<EditPost />} />
          </Route>
          <Route path="followers" element={<Follow />} />
          <Route path="following" element={<Follow />} />
          <Route
            exact
            path="postdetailpopup/:postId"
            element={<PostDetailPopUp />}
          />
          <Route path="/" element={<Home />}>
            <Route exact path="adduserdetails" element={<AddUserDetails />} />
            <Route exact path="createpost" element={<CreatePostSection />} />
          </Route>
          <Route exact path="/finddevelopers" element={<FindDevelopers />} />
        </Route>
        <Route exact path="emailverification/:userToken" element={<EmailVerification/>}/>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
