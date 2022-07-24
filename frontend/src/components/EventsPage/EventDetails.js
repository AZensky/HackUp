import React from "react";
import "./EventDetails.css";

function EventDetails({ name, group, city, state, attendees }) {
  return (
    <div className="event-details-container">
      <div className="event-details-info">
        <img
          src="https://secure-content.meetupstatic.com/images/event/bead49a9-fee8-47fa-8a4e-e976d3fe30ec/333x188.webp"
          alt="Event Image"
        />
        <div className="event-details-description">
          <time>Fri, Mar 3 · 11:00 AM PDT</time>
          <p className="event-details-title">{name}</p>
          <p className="event-details-group-name">
            {group} · {city}, {state}
          </p>
          <p className="event-details-group-attendees">
            {attendees} {attendees === 1 ? "attendee" : "attendees"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
