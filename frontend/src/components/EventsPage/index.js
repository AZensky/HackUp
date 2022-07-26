import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/events";
import NavChoice from "../EventGroupSharedComponents/NavChoice";
import EventDetails from "./EventDetails";
import Footer from "../Footer";
import "./EventsPage.css";

function EventsPage() {
  const dispatch = useDispatch();

  const events = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <>
      <div className="events-page-container">
        <NavChoice displaySort={false} isEvent={true} />
        {events.length > 0 &&
          events.map((event) => (
            <EventDetails
              key={event.id}
              name={event.name}
              group={event.Group.name}
              city={event.Venue.city}
              state={event.Venue.state}
              attendees={event.numAttending}
              preview={event.previewImage}
              id={event.id}
            />
          ))}
      </div>

      <Footer />
    </>
  );
}

export default EventsPage;
