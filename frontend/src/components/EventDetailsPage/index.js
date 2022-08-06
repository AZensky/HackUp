import React, { useEffect, useState } from "react";
import "./EventDetailsPage.css";
import { useParams } from "react-router-dom";
import EventDetailsHeader from "./EventDetailsHeader";
import OtherEvents from "../OtherEvents";

function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState();
  useEffect(() => {
    const setEventDetails = async () => {
      const response = await fetch(`/api/events/${eventId}`);
      const data = await response.json();
      setEvent(data);
      return data;
    };

    setEventDetails().catch(console.error);
  }, [eventId]);

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

  let timeStr;

  if (event) {
    const newDate = new Date(event.startDate);
    const startDateNum = newDate.getUTCDate();
    let startDay = days[newDate.getDay()];
    let startHour = newDate.getHours();
    let startMonth = monthNames[newDate.getMonth()];
    const startMinute = newDate.getMinutes();
    const startYear = newDate.getFullYear();

    const endDate = new Date(event.endDate);
    const endDateNum = endDate.getUTCDate();
    let endDay = days[endDate.getDay()];
    let endHour = endDate.getHours();
    let endMonth = monthNames[endDate.getMonth()];
    const endMinute = endDate.getMinutes();
    const endYear = endDate.getFullYear();

    timeStr = `${startDay}, ${startMonth}, ${startDateNum}, ${startYear} at ${
      startHour > 12 ? startHour - 12 : startHour
    }:${
      startMinute >= 10 ? startMinute : "0" + startMinute
    } PDT to ${endDay}, ${endMonth}, ${endDateNum}, ${endYear} at ${
      endHour > 12 ? endHour - 12 : endHour
    }:${endMinute >= 10 ? endMinute : "0" + endMinute} PDT`;
  }

  return (
    <>
      <EventDetailsHeader event={event} />
      <div className="event-details-page__main-content-container">
        <div className="event-details-page__main-content">
          <div className="event-details-page__main-img-content">
            {event && event.Images[0] ? (
              <img src={event.Images[0]?.url} alt="Event Pic" />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6lrmBCsboVg4QhJtKQP7QzwmtYDnY3Jsbw&usqp=CAU"
                alt="Event pic"
              />
            )}
            <div className="right-hand-event-info">
              <div className="right-event-info__group-container">
                {event && event.Images[0] ? (
                  <img src={event.Images[0]?.url} alt="Event Pic" />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNu3n3yXwM8Y7kbTuTCPS6g8mf4eAlniV6g&usqp=CAU"
                    alt="Event pic"
                  />
                )}
                <div className="right-event-info__group-name">
                  {event && event.Group.name}
                </div>
              </div>

              <div className="right-event-info__location-container">
                <div className="right-time-container">
                  <i className="fa-solid fa-clock"></i>
                  <time>{timeStr}</time>
                </div>
                <div className="location-address-city-container">
                  <i className="fa-solid fa-lg fa-location-pin"></i>
                  <div className="location-address">
                    <span>{event && event.Venue.city}</span>
                    <span>
                      {event && event?.Venue.address}
                      {event?.Venue.address !== "No Venue" && ", "}
                      {event && event?.Venue.city}
                      {event?.Venue.address !== "No Venue" && ", "}
                      {event && event?.Venue.state}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Description */}
          <div className="event-details__description">
            <h2>Details</h2>
            <p>{event && event.description}</p>
          </div>
        </div>

        <OtherEvents />
      </div>
    </>
  );
}

export default EventDetailsPage;
