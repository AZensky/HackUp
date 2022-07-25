import React from "react";
import "./OtherEventCard.css";

function OtherEventCard() {
  return (
    <div class="other-event-card-container">
      <div className="other-event-card">
        <div className="other-event-details">
          <time>Fri, Mar 3 · 6:30 PM PDT</time>
          <h4>Happy Hour </h4>
          <p>20-30ish Midtown Women's Group </p>
          <div className="other-events-location">
            <i class="fa-solid fa-lg fa-location-pin"></i>
            <span>1716 L Street · Sacramento, CA</span>
          </div>
        </div>

        <div className="other-event-numAttendees">37 Attendees</div>
      </div>
    </div>
  );
}

export default OtherEventCard;
