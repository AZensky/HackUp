import React from "react";
import "./UpcomingEvent.css";
import { Link } from "react-router-dom";

function UpcomingEvent({ preview, name, group, id, startDate }) {
  let days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const newDate = new Date(startDate);
  const date = newDate.getUTCDate();
  let day = days[newDate.getDay()];
  let hours = newDate.getHours();
  let month = monthNames[newDate.getMonth()];
  const minutes = newDate.getMinutes();

  const timeStr = `${day}, ${month} ${date} · ${
    hours > 12 ? hours - 12 : hours
  }:${minutes >= 10 ? minutes : "0" + minutes} ${hours > 12 ? "PM" : "AM"}`;

  return (
    <Link to={`/events/${id}`} className="upcoming-events__event">
      <img src={preview} alt="People Talking" />
      <div className="upcoming-events__event__details">
        <time>{timeStr}</time>
        <p className="upcoming-events-event-title">{name}</p>
        <p className="upcoming-events__group-name">{group}</p>
      </div>
    </Link>
  );
}

export default UpcomingEvent;
