import React from "react";
import "./OtherEventCard.css";

//prettier-ignore
function OtherEventCard({ id, name, city, state, group, attendees, startDate, }) {

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
  }`;

  return (
    <div className="other-event-card-container">
      <div className="other-event-card">
        <div className="other-event-details">
          <time>{timeStr}</time>
          <h4>{name}</h4>
          <p>{group}</p>
          <div className="other-events-location">
            <i className="fa-solid fa-lg fa-location-pin"></i>
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
