import React from "react";
import "./EventDetails.css";
import { Link } from "react-router-dom";

//prettier-ignore
function EventDetails({name, group, city, state, attendees, preview, id, startDate, }) {
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
  }:${minutes >= 10 ? minutes : "0" + minutes} ${
    hours > 12 ? "PM" : "AM"
  } PDT`;

  return (
    <Link to={`/events/${id}`} className="event-details-container">
      <div className="event-details-info">
        <img
          src={
            preview
              ? preview
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6lrmBCsboVg4QhJtKQP7QzwmtYDnY3Jsbw&usqp=CAU"
          }
          alt="Event Pic"
        />
        <div className="event-details-description">
          <time>{timeStr}</time>
          <p className="event-details-title">{name}</p>
          <p className="event-details-group-name">
            {group} {city && '·'} {city}{city && ','} {state}
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
