import React, { useEffect, useState } from "react";
import "./EventDetailsPage.css";
import { useParams } from "react-router-dom";
import EventDetailsHeader from "./EventDetailsHeader";
import Footer from "../Footer";
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

  console.log(event);

  return (
    <>
      <EventDetailsHeader event={event} />
      <div className="event-details-page__main-content-container">
        <div className="event-details-page__main-content">
          <div className="event-details-page__main-img-content">
            {/* {event && <img src={event.Images[0]} alt="Event Image" />} */}
            <img
              src="https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="Event pic"
            />
            <div className="right-hand-event-info">
              <div className="right-event-info__group-container">
                <img
                  src="https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="placeholder pic"
                />
                <div className="right-event-info__group-name">
                  {event && event.Group.name}
                </div>
              </div>

              <div className="right-event-info__location-container">
                <div className="right-time-container">
                  <i class="fa-solid fa-clock"></i>
                  <time>
                    Friday, March 3, 2023 at 5:15 PM to Friday, March 3, 2023 at
                    6:00 PM
                  </time>
                </div>
                <div className="location-address-city-container">
                  <i class="fa-solid fa-lg fa-location-pin"></i>
                  <div className="location-address">
                    <span>{event && event.Venue.city}</span>
                    <span>
                      {event && event.Venue.address},{" "}
                      {event && event.Venue.city}, {event && event.Venue.state}
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
      <Footer />
    </>
  );
}

export default EventDetailsPage;
