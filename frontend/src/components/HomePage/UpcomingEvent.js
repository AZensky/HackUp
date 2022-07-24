import React from "react";
import "./UpcomingEvent.css";
import { Link } from "react-router-dom";

function UpcomingEvent({ preview, name, group, id }) {
  return (
    <Link to={`/events/${id}`} className="upcoming-events__event">
      <img src={preview} alt="People Talking" />
      <div className="upcoming-events__event__details">
        <time>Fri, Mar 3 · 11:00 AM PDT</time>
        <p className="upcoming-events-event-title">{name}</p>
        <p className="upcoming-events__group-name">{group}</p>
      </div>
    </Link>
  );
}

export default UpcomingEvent;
