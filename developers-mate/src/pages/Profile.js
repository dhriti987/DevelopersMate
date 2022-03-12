import React, { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/profile/Profile.css";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileSkills from "../components/profile/ProfileSkills";
import ProfileProject from "../components/profile/ProfileProject";
import ProfileExperience from "../components/profile/ProfileExperience";
import ProfileEducation from "../components/profile/ProfileEducation";
import { Outlet } from "react-router-dom";
import { useGetRequestMutation } from "../redux/PrivateApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../redux/UserDetails";
import Spinner from "../assets/common/Spinner.gif";
import ProfileLinks from "../components/profile/ProfileLinks";
import RecentPost from "../components/profile/RecentPost";

function Profile() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails.value);
  const [getProfile, response] = useGetRequestMutation();
  useEffect(() => {
    getProfile("profile/profile/")
      .unwrap()
      .then((payload) => {
        dispatch(setUserDetails(payload));
      });
  }, []);
  return (
    <>
      <PrivateNavbar />
      {response.isLoading ? (
        <div style={{
          display:"flex",
          justifyContent:"center",
          marginTop:"5rem"
        }}>

          <img src={Spinner} alt="" style={{background:"inherit"}}/>
        </div>
      ) : (
        <main className="profile-page">
          <Outlet />
          <ProfileDetails />
          <ProfileBio />
          <ProfileSkills />
          <ProfileProject />
          <ProfileExperience />
          <ProfileEducation />
          <RecentPost/>
          <ProfileLinks/>
        </main>
      )}
    </>
  );
}

export default Profile;
