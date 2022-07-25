import React from "react";
import { Link } from "react-router-dom";
import "./GroupDetail.css";

function GroupDetails({ name, city, state, about, members, preview, id }) {
  return (
    <Link to={`/groups/${id}`} className="group-details-container">
      <div className="group-details-info">
        <img src={preview} alt="Event Pic" />
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
