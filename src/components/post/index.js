import React from "react";
import "./style.scss";
import moment from "moment";
const Post = ({ data, user }) => {
  return (
    <div className="w-100 post-container d-flex mt-4">
      <div
        className="profile"
        style={{ backgroundImage: `url(${user.profile})` }}
      ></div>
      <div className="container">
        <div className="title">
          <b>{user.fullname}</b> @{user.username} -{" "}
          {moment(data.createdAt).format("MMM DD")}
        </div>
        <div
          className={`description ${
            String(data.description).trim().length < 50 &&
            !data.image &&
            !data.gif &&
            !data.emoji &&
            "large"
          }`}
        >
          {String(data.description).trim()}
        </div>
        {data.emoji && <h1>{data.emoji}</h1>}
        {(data.image || data.gif) && (
          <img src={data.image || data.gif} alt="" className="img-fluid" />
        )}
      </div>
    </div>
  );
};

export default Post;
