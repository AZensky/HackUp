import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/events";
import NavChoice from "../EventGroupSharedComponents/NavChoice";
import EventDetails from "./EventDetails";
import "./EventsPage.css";

function EventsPage() {
  const dispatch = useDispatch();
  const events = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  console.log(events);

  return (
    <div className="events-page-container">
      <NavChoice />
      {events.map((event) => (
        <EventDetails
          key={event.id}
          group={event.Group.name}
          city={event.Venue.city}
          attendees={event.numAttending}
        />
      ))}
    </div>
  );
}

export default EventsPage;
