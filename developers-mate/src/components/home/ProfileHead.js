import React from "react";
import "../../style/home/ProfileHead.css";
import bannerBg from "../../assets/home/banner.jpg";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileHead({ item, isEdit,isPost }) {
  const otherUserId = useSelector((state)=>state.otherUserId.value)
  return (
    <>
      {item && (
        <div className="head" style={isEdit ? { justifyContent: "unset" } : {}}>
          <img src={`http://127.0.0.1:8000${item.user_image}`} alt="" />
          <div className="headDetails">
            <h4 style={{ fontWeight: "500", margin: "0 0.3rem" }}>
              {item.user}
            </h4>
            <h5
              style={{
                fontWeight: "300",
                color: "rgba(243, 243, 243, 0.8)",
                margin: "0 0.3rem",
                lineHeight: "0.9rem",
              }}
            >
              {isEdit ? item.post_date : item.time_interval}
            </h5>
            {isPost && !otherUserId &&
            <div className="alterPosts">
              <Link to={`/showallpost/editpost/${item.post_id}/`}>
                <BiPencil
                  color="white"
                  size={28}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "3rem",
                    top: "0.5rem",
                  }}
                  className="icon"
                />
              </Link>
                
            </div>
            }
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileHead;
