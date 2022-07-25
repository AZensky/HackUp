import React from "react";
import "./EventDetails.css";
import { Link } from "react-router-dom";

function EventDetails({ name, group, city, state, attendees, preview, id }) {
  return (
    <Link to={`/events/${id}`} className="event-details-container">
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
    </Link>
  );
}

export default EventDetails;
