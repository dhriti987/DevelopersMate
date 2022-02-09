import React from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import "../style/profile/Profile.css";
import profilePic from "../assets/profile/bannerBg.jpg";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

function Profile() {
  return (
    <>
      <PrivateNavbar />
      <main className="profile-page">
        <div className="profileDetails">
          <div className="banner"></div>
          <div className="profileImage">
            <img src={profilePic} alt="" />
          </div>
          <BiEdit color="white" className="editbtn" size={24} />
          <div className="userProfileDetails">
            <h2>Nitin Rajesh</h2>
            <h4 style={{ fontWeight: "500" }}>
              B.E CSE | Front-end developer(HTML, CSS, JS, React) |Good Problem
              Solving Skills | Open source contributer
            </h4>
          </div>
        </div>
        <div className="bioContainer commonBox">
          <h1>Bio</h1>
          <div className="bioSection">
            <h4>

            Currently, I'm a 2nd year student of Manipal University Jaipur. I am
            very passionate about Problems solving and love to solve problems on
            leetcode.In addition to the above skillset, my other skillset
            include coding in Python, C++ and some experience with web dev.I
            also love to contribute in open source as well. My other interest
            include playing chess, cricket and basketball.
            </h4>
          </div>
          <div className="showMoreArrow" style={{margin:"0 auto"}}>
            <AiOutlineDown
              style={{ cursor: "pointer" }}
              color="white"
              size={25}
            />
          </div>
        </div>
        <div className="skillsContainer commonBox">
          <div className="head">
            <h1>Skills</h1>
            <div className="editAddContainer">
              <IoMdAdd color="white" size={28} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div className="skills">
            <div className="skill">
              <h3>React</h3>
              <AiFillDelete
                color="white"
                size={28}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="skill">
              <h3>JavasScript</h3>
              <AiFillDelete
                color="white"
                size={28}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="skill">
              <h3>Python</h3>
              <AiFillDelete
                color="white"
                size={28}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="showMoreArrow">
            <AiOutlineDown
              style={{ cursor: "pointer" }}
              color="white"
              size={25}
            />
          </div>
        </div>
        <div className="projectContainer commonBox">
          <div className="head">
            <h1>Projects</h1>
            <div className="editAddContainer">
              <IoMdAdd color="white" size={28} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div className="projects">
            <div className="project">
              <div className="projectHead">
                <h3>Quiz Portal</h3>
                <div className="projectIcons">
                  <BiEdit
                    color="white"
                    size={28}
                    style={{ cursor: "pointer" }}
                  />
                  <AiFillDelete
                    color="white"
                    size={28}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <h5 style={{ fontWeight: "400", color: "#E5E5E5" }}>
                12 Dec 2020 - 12 Jan 2021
              </h5>
              <div className="links">
                <button>
                  <h5 style={{ color: "#1C1C1C" }}>Project</h5>
                </button>
                <button>
                  <h5 style={{ color: "#1C1C1C" }}>Live</h5>
                </button>
              </div>
              <h4>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                beatae officia sit ipsum praesentium nemo dolorem eligendi velit
                aperiam accusamus. Quam expedita ex repellendus suscipit aut
                dolores itaque placeat ducimus.
              </h4>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
