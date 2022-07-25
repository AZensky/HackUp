import React from "react";
import "./EventDetailsHeader.css";

function EventDetailsHeader({ event }) {
  return (
    <div className="event-details-header-container">
      <div className="event-details-header-content">
        <time>Friday, March 3, 2023</time>
        <h1>{event && event.name} </h1>
        <div className="event-organizer-info">
          <i class="fa-solid fa-user"></i>
          <div className="hosted-label">
            <p>Hosted By</p>
            <span>
              {event && event.Organizer.firstName}{" "}
              {event && event.Organizer.lastName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsHeader;
