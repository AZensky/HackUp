import React from "react";
import "./EventDetails.css";

function EventDetails({ group, city, attendees }) {
  return (
    <div className="event-details-container">
      <div className="event-details-info">
        <img
          src="https://secure-content.meetupstatic.com/images/event/bead49a9-fee8-47fa-8a4e-e976d3fe30ec/333x188.webp"
          alt="Event Image"
        />
      </div>
    </div>
  );
}

export default EventDetails;
