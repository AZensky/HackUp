import React from "react";
import "./OtherEventCard.css";

function OtherEventCard({ id, name, city, state, group, attendees }) {
  return (
    <div class="other-event-card-container">
      <div className="other-event-card">
        <div className="other-event-details">
          <time>Fri, Mar 3 · 6:30 PM PDT</time>
          <h4>{name}</h4>
          <p>{group}</p>
          <div className="other-events-location">
            <i class="fa-solid fa-lg fa-location-pin"></i>
            <span>
              {city}, {state}
            </span>
          </div>
        </div>

        <div className="other-event-numAttendees">
          {attendees} {attendees === 1 ? "attendee" : "attendees"}
        </div>
      </div>
    </div>
  );
}

export default OtherEventCard;
