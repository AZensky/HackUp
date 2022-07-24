import React from "react";
import "./GroupDetail.css";

function GroupDetails({ name, city, state, about, members }) {
  return (
    <div className="group-details-container">
      <div className="group-details-info">
        <img
          src="https://secure-content.meetupstatic.com/images/event/bead49a9-fee8-47fa-8a4e-e976d3fe30ec/333x188.webp"
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
    </div>
  );
}

export default GroupDetails;
