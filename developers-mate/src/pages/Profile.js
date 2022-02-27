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
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/UserDetails";
import WarningPopUp from "../components/WarningPopUp";
import CoverBackground from "../components/CoverBackground";

function Profile() {
  const dispatch = useDispatch();
  const [post, response] = useGetRequestMutation();
  useEffect(() => {
    post("profile/profile/")
      .unwrap()
      .then((payload) => {
        dispatch(setUserDetails(payload));
      });
  }, []);

  return (
    <>
      <PrivateNavbar />
      <main className="profile-page">
        <Outlet />
        <ProfileDetails />
        <ProfileBio />
        <ProfileSkills />
        <ProfileProject />
        <ProfileExperience />
        <ProfileEducation />
      </main>
    </>
  );
}

export default Profile;
