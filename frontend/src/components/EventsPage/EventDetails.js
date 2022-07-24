import React from "react";
import "./EventDetails.css";

function EventDetails({ name, group, city, state, attendees, preview }) {
  return (
    <div className="event-details-container">
      <div className="event-details-info">
        <img src={preview} alt="Event Pic" />
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
