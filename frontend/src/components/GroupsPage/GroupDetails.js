import React from "react";
import { Link } from "react-router-dom";
import "./GroupDetail.css";

function GroupDetails({ name, city, state, about, members, preview, id }) {
  return (
    <Link to={`/groups/${id}`} className="group-details-container">
      <div className="group-details-info">
        <img
          src={
            preview
              ? preview
              : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          }
          alt="Event Pic"
        />
        <div className="group-details-description">
          <p className="group-details-name">{name}</p>
          <p className="group-details-location">
            {city}, {state}
          </p>
          <div className="group-details-about">{about}</div>
          <p className="group-details-group-attendees">
            {members} {members === 1 ? "member" : "members"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default GroupDetails;
