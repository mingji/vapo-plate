import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const Group = ({ data }) => {
  return (
    <Link to={`/message/${data.id}`}>
      <div className="w-100 group-single-container d-flex mt-4">
        <div
          className="profile"
          style={{ backgroundImage: `url(${data.profile})` }}
        ></div>
        <div className="container">
          <div className="align-items-center d-flex title">
            <b>{data.name} </b>
            {"  "} <span className="ml-2">{data?.members?.length} Members</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Group;
